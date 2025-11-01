import { createAdminClient } from "../../lib/supabase";
import { NextResponse } from "next/server";

const supabase = createAdminClient();

interface STKPushResponse {
  MerchantRequestID?: string;
  CheckoutRequestID?: string;
  ResponseCode?: string;
  ResponseDescription?: string;
  CustomerMessage?: string;
  errorCode?: string;
  errorMessage?: string;
  requestId?: string;
}

interface TokenResponse {
  access_token: string;
  expires_in?: string;
}

// Define proper TypeScript types
type MpesaEnvironment = 'sandbox' | 'production';

interface MpesaConfig {
  tokenUrl: string;
  stkPushUrl: string;
  defaultShortCode: string;
  defaultPasskey: string;
  defaultTillNumber: string;
  transactionType: string;
}

// Define interface for transaction data
interface TransactionData {
  merchant_request_id: string;
  checkout_request_id: string;
  result_code: number;
  result_description: string;
  amount: number;
  phone_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  product_name?: string;
  quantity?: number;
  size?: string;
}

// Environment configuration with proper typing
const MPESA_CONFIG: Record<MpesaEnvironment, MpesaConfig> = {
  sandbox: {
    tokenUrl: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPushUrl: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    defaultShortCode: "174379",
    defaultPasskey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    defaultTillNumber: "174379",
    transactionType: "CustomerPayBillOnline"
  },
  production: {
    tokenUrl: "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPushUrl: "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    defaultShortCode: "",
    defaultPasskey: "",
    defaultTillNumber: "",
    transactionType: "CustomerBuyGoodsOnline"
  }
};

const getCallbackUrl = (): string => {
  // For both production and development, use the environment variable
  if (process.env.MPESA_CALLBACK_URL) {
    return process.env.MPESA_CALLBACK_URL;
  }
  
  // Fallback for development - but this won&apos;t work with M-Pesa
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  console.warn('⚠️ Using HTTP callback URL - this may not work with M-Pesa');
  return `${appUrl}/api/callback`;
}

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc, productName, quantity, size } = await req.json();

    // Enhanced validation
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields",
          required: ["phoneNumber", "amount"],
          example: {
            phoneNumber: "254712345678",
            amount: 1,
            accountReference: "St Marys Mukuru Parish",
            transactionDesc: "Charity in Faith Donation"
          }
        },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: "Amount must be at least 1 KSH" },
        { status: 400 }
      );
    }

    // Get environment with proper type assertion
    const environment = (process.env.MPESA_ENVIRONMENT === 'production' ? 'production' : 'sandbox') as MpesaEnvironment;
    
    console.log(`🚀 M-Pesa Environment: ${environment} (${environment === 'production' ? 'LIVE' : 'SANDBOX'})`);

    // Enhanced environment variable validation
    const configValidation = validateMpesaConfig(environment);
    if (!configValidation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: "M-Pesa configuration error",
          details: configValidation.errors,
          environment,
          help: configValidation.help
        },
        { status: 500 }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);

    // Step 1: Get access token with enhanced debugging
    const tokenResult = await getAccessToken(environment);
    
    if (!tokenResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to get access token",
          details: tokenResult.error,
          environment,
          troubleshooting: getTroubleshootingTips(environment, 'token')
        },
        { status: 500 }
      );
    }

    // Step 2: Call STK push helper
    const stkResponse = await initiateSTKPush(
      tokenResult.accessToken!,
      formattedPhone,
      amount,
      accountReference || "Goods Purchase",
      transactionDesc || "Payment for goods",
      environment
    );

    // Enhanced response
    if (stkResponse.ResponseCode === "0") {
      // Save initial transaction record to database
      try {
        const transactionData: TransactionData = {
          merchant_request_id: stkResponse.MerchantRequestID!,
          checkout_request_id: stkResponse.CheckoutRequestID!,
          result_code: 0, // pending
          result_description: "STK Push initiated - pending user input",
          amount: amount,
          phone_number: formattedPhone,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Add optional product details if provided
        const extendedData: TransactionData = { ...transactionData };
        if (productName) extendedData.product_name = productName;
        if (quantity) extendedData.quantity = quantity;
        if (size) extendedData.size = size;

        const { error: dbError, data: dbData } = await supabase
          .from("epic_softwares_mpesa")
          .insert([extendedData])
          .select();

        if (dbError) {
          console.error("❌ Failed to save initial transaction:", dbError);
          // Don&apos;t fail the request - STK push was successful
        } else {
          console.log("✅ Initial transaction record saved:", dbData?.[0]?.id);
        }
      } catch (dbError: unknown) {
        console.error("❌ Error saving initial transaction:", dbError);
        // Don&apos;t fail the request - STK push was successful
      }

      return NextResponse.json({ 
        success: true, 
        message: "STK push initiated successfully. Check your phone to complete payment.",
        environment,
        data: {
          merchantRequestID: stkResponse.MerchantRequestID,
          checkoutRequestID: stkResponse.CheckoutRequestID,
          responseDescription: stkResponse.ResponseDescription,
          customerMessage: stkResponse.CustomerMessage
        },
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('STK Push failed:', stkResponse);
      return NextResponse.json({
        success: false,
        error: stkResponse.errorMessage || stkResponse.ResponseDescription || "STK push failed",
        environment,
        data: stkResponse,
        troubleshooting: getTroubleshootingTips(environment, 'stk')
      }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('STK Push error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to initiate STK push", 
        details: errorMessage,
        environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
        troubleshooting: getTroubleshootingTips((process.env.MPESA_ENVIRONMENT as MpesaEnvironment) || 'sandbox', 'general')
      },
      { status: 500 }
    );
  }
}

// Enhanced troubleshooting tips
function getTroubleshootingTips(environment: MpesaEnvironment, issueType: 'token' | 'stk' | 'general'): string[] {
  const tips: string[] = [];
  
  if (environment === 'production') {
    tips.push('✅ Check that your IP address is whitelisted with Safaricom');
    tips.push('✅ Verify your live credentials are activated (not just received)');
    tips.push('✅ Ensure your Business ShortCode and Till Number match what Safaricom provided');
    tips.push('✅ Confirm your callback URL has valid SSL certificate');
    tips.push('✅ Test with small amount first (1-10 KSH)');
    
    if (issueType === 'token') {
      tips.push('🔑 Live Consumer Key/Secret might not be activated');
      tips.push('🔑 Contact Safaricom to confirm API access is enabled');
    }
    
    if (issueType === 'stk') {
      tips.push('📱 Verify TransactionType matches your business type (PayBill vs Buy Goods)');
      tips.push('📱 Check that your Till Number is active and configured for STK');
    }
  } else {
    tips.push('🔄 Sandbox is working - focus on live credential activation');
    tips.push('🔄 Compare your live credentials format with sandbox format');
  }
  
  return tips;
}

// Enhanced environment validation
function validateMpesaConfig(environment: MpesaEnvironment): { isValid: boolean; errors: string[]; help?: string } {
  const errors: string[] = [];
  let help = '';

  // Check required environment variables
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!consumerKey) errors.push('MPESA_CONSUMER_KEY is required');
  if (!consumerSecret) errors.push('MPESA_CONSUMER_SECRET is required');
  if (!businessShortCode) errors.push('MPESA_BUSINESS_SHORTCODE is required');
  if (!passkey) errors.push('MPESA_PASSKEY is required');
  if (!callbackUrl) errors.push('MPESA_CALLBACK_URL is required');

  // Enhanced validation for production
  if (environment === 'production') {
    if (consumerKey && consumerKey.includes('sandbox')) {
      errors.push('MPESA_CONSUMER_KEY appears to be sandbox credentials');
    }
    if (businessShortCode === '174379') {
      errors.push('MPESA_BUSINESS_SHORTCODE appears to be sandbox shortcode');
    }
    if (passkey && passkey.includes('bfb279f9')) {
      errors.push('MPESA_PASSKEY appears to be sandbox passkey');
    }
  }

  // Provide helpful suggestions based on environment
  if (environment === 'sandbox') {
    if (!businessShortCode) {
      help = 'For sandbox, use MPESA_BUSINESS_SHORTCODE=174379';
    }
    if (!passkey) {
      help = 'For sandbox, use the default passkey from Safaricom developer portal';
    }
  } else {
    help = 'For production, ensure you have received LIVE credentials from Safaricom after going through the production onboarding process';
  }

  return {
    isValid: errors.length === 0,
    errors,
    help: help || undefined
  };
}

// Enhanced token function with better error detection
async function getAccessToken(environment: MpesaEnvironment): Promise<{ success: boolean; accessToken?: string; error?: string }> {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return {
        success: false,
        error: `Missing M-Pesa credentials. Check your ${environment.toUpperCase()} environment variables.`
      };
    }

    // Log credential format (without exposing full secrets)
    console.log(`🔑 Credentials Check:`, {
      environment,
      consumerKeyLength: consumerKey.length,
      consumerKeyPrefix: consumerKey.substring(0, 10) + '...',
      consumerSecretLength: consumerSecret.length,
      consumerSecretPrefix: consumerSecret.substring(0, 10) + '...'
    });

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const tokenUrl = MPESA_CONFIG[environment].tokenUrl;

    console.log(`🔑 Getting token from: ${environment.toUpperCase()}`);
    console.log(`🔑 Token URL: ${tokenUrl}`);

    const tokenRes = await fetch(tokenUrl, {
      headers: { 
        Authorization: `Basic ${auth}`,
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    });

    console.log(`🔑 Token response status: ${tokenRes.status}`);

    // Enhanced error handling for specific status codes
    if (tokenRes.status === 401) {
      return {
        success: false,
        error: `Invalid credentials (401 Unauthorized). Check your ${environment} Consumer Key and Secret.`
      };
    }

    if (tokenRes.status === 403) {
      return {
        success: false,
        error: `Access forbidden (403). Your IP may not be whitelisted or credentials not activated for ${environment}.`
      };
    }

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error(`🔑 Token fetch failed: ${errorText}`);
      return {
        success: false,
        error: `Token API returned ${tokenRes.status}: ${errorText}`
      };
    }

    const tokenData: TokenResponse = await tokenRes.json();
    
    if (!tokenData.access_token) {
      return {
        success: false,
        error: 'No access token in response - credentials may be invalid'
      };
    }

    console.log(`🔑 Token received (length: ${tokenData.access_token.length})`);
    return {
      success: true,
      accessToken: tokenData.access_token
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('🔑 Token generation error:', errorMessage);
    
    // Network error detection
    if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
      return {
        success: false,
        error: `Network error - cannot reach Safaricom ${environment} API. Check firewall/whitelisting.`
      };
    }
    
    return {
      success: false,
      error: `Unexpected error: ${errorMessage}`
    };
  }
}

// Get M-Pesa configuration with fallbacks
function getMpesaConfig(environment: MpesaEnvironment) {
  const config = MPESA_CONFIG[environment];
  const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE || config.defaultShortCode;
  const passkey = process.env.MPESA_PASSKEY || config.defaultPasskey;
  const tillNumber = process.env.MPESA_TILL_NUMBER || businessShortCode;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  const transactionType = config.transactionType;

  return {
    businessShortCode,
    passkey,
    tillNumber,
    callbackUrl,
    transactionType
  };
}

// STK Push initiation
async function initiateSTKPush(
  accessToken: string,
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string,
  environment: MpesaEnvironment
): Promise<STKPushResponse> {
  const config = getMpesaConfig(environment);

  console.log(`📱 STK Push Configuration:`, {
    environment: environment.toUpperCase(),
    businessShortCode: config.businessShortCode,
    tillNumber: config.tillNumber,
    phoneNumber,
    amount,
    hasPasskey: !!config.passkey,
    callbackUrl: config.callbackUrl,
    transactionType: config.transactionType
  });

  // Enhanced validation for production
  if (environment === 'production') {
    if (config.businessShortCode === '174379') {
      throw new Error('Invalid Business ShortCode for production. Use your live business shortcode.');
    }
    if (config.passkey?.includes('bfb279f9')) {
      throw new Error('Invalid Passkey for production. Use your live passkey from Safaricom.');
    }
  }

  // Final validation
  if (!config.businessShortCode || !config.passkey || !config.callbackUrl) {
    const missing = [];
    if (!config.businessShortCode) missing.push('Business ShortCode');
    if (!config.passkey) missing.push('Passkey');
    if (!config.callbackUrl) missing.push('Callback URL');
    
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }

  const timestamp = getTimestamp();
  const password = Buffer.from(config.businessShortCode + config.passkey + timestamp).toString("base64");

  const stkPushUrl = MPESA_CONFIG[environment].stkPushUrl;

  const payload = {
    BusinessShortCode: config.businessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: config.transactionType,
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: config.tillNumber,
    PhoneNumber: phoneNumber,
    CallBackURL: getCallbackUrl(),
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };

  console.log(`📱 STK Push Request to: ${stkPushUrl}`);
  console.log(`📱 Payload:`, { ...payload, Password: '***' });

  const response = await fetch(stkPushUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log(`📱 STK Push Response (${response.status}):`, responseText);

  if (!response.ok) {
    // Enhanced error parsing for common production issues
    let enhancedError = `STK Push API returned ${response.status}: ${responseText}`;
    
    if (response.status === 401) {
      enhancedError += ' - Invalid access token or expired credentials';
    } else if (response.status === 403) {
      enhancedError += ' - IP not whitelisted or insufficient permissions';
    } else if (response.status === 404) {
      enhancedError += ' - Invalid endpoint or service not available';
    }
    
    throw new Error(enhancedError);
  }

  try {
    const data: STKPushResponse = JSON.parse(responseText);
    return data;
  } catch {
    throw new Error(`Failed to parse STK Push response: ${responseText}`);
  }
}

// Helper functions
function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.substring(1);
  } else if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  
  if (cleaned.length !== 12 || !cleaned.startsWith('254')) {
    throw new Error('Invalid phone number format. Use: 2547XXXXXXXX or 07XXXXXXXX');
  }
  
  return cleaned;
}