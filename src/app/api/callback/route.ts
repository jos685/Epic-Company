import { NextResponse } from "next/server";
import { createAdminClient } from "../../lib/supabase";

const supabase = createAdminClient();

// Define proper TypeScript interfaces
interface CallbackMetadataItem {
  Name: string;
  Value: string | number | null;
}

interface STKCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: CallbackMetadataItem[];
  };
}

interface CallbackData {
  Body: {
    stkCallback: STKCallback;
  };
}

interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
  stack?: string;
}

export async function POST(req: Request) {
  let checkoutRequestId = '';
  
  try {
    const callbackData: CallbackData = await req.json();

    console.log("📞 M-Pesa Callback Received:", JSON.stringify(callbackData, null, 2));

    const stkCallback = callbackData?.Body?.stkCallback;
    if (!stkCallback) {
      console.log("❌ No STK callback data found");
      return NextResponse.json({ ResultCode: 0, ResultDesc: "No callback data" });
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stkCallback;

    checkoutRequestId = CheckoutRequestID;

    console.log(`🔄 Processing callback for CheckoutRequestID: ${checkoutRequestId}, ResultCode: ${ResultCode}`);

    // Extract metadata safely with proper typing
    const amount = CallbackMetadata?.Item?.find((i: CallbackMetadataItem) => i.Name === "Amount")?.Value ?? null;
    const mpesaReceiptNumber = CallbackMetadata?.Item?.find((i: CallbackMetadataItem) => i.Name === "MpesaReceiptNumber")?.Value ?? null;
    const transactionDate = CallbackMetadata?.Item?.find((i: CallbackMetadataItem) => i.Name === "TransactionDate")?.Value ?? null;
    const phoneNumber = CallbackMetadata?.Item?.find((i: CallbackMetadataItem) => i.Name === "PhoneNumber")?.Value ?? null;

    // Database operation with better error handling
    let dbSuccess = false;
    
    try {
      console.log("💾 Attempting database operation...");

      // First, check if transaction already exists
      const { data: existingTransaction, error: fetchError } = await supabase
        .from("epic_softwares_mpesa")
        .select("*")
        .eq("checkout_request_id", checkoutRequestId)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') { // No rows found
          console.log("ℹ️ No existing transaction found, will insert new record");
        } else {
          console.error("❌ Error checking existing transaction:", {
            message: fetchError.message,
            code: fetchError.code,
            details: fetchError.details
          } as DatabaseError);
        }
      }

      let dbOperation;
      
      if (existingTransaction) {
        // Update existing transaction
        console.log("✅ Updating existing transaction");
        dbOperation = await supabase
          .from("epic_softwares_mpesa")
          .update({
            result_code: ResultCode,
            result_description: ResultDesc,
            amount: amount !== null ? amount : existingTransaction.amount,
            mpesa_receipt_number: mpesaReceiptNumber,
            transaction_date: transactionDate,
            phone_number: phoneNumber !== null ? phoneNumber.toString() : existingTransaction.phone_number,
            status: ResultCode === 0 ? "success" : "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("checkout_request_id", checkoutRequestId);
      } else {
        // Insert new transaction (fallback)
        console.log("⚠️ No existing transaction found, inserting new record");
        dbOperation = await supabase.from("epic_softwares_shop").insert([
          {
            merchant_request_id: MerchantRequestID,
            checkout_request_id: checkoutRequestId,
            result_code: ResultCode,
            result_description: ResultDesc,
            amount,
            mpesa_receipt_number: mpesaReceiptNumber,
            transaction_date: transactionDate,
            phone_number: phoneNumber?.toString(),
            status: ResultCode === 0 ? "success" : "failed",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }

      if (dbOperation.error) {
        console.error("❌ Database operation failed:", {
          message: dbOperation.error.message,
          code: dbOperation.error.code,
          details: dbOperation.error.details,
          hint: dbOperation.error.hint
        } as DatabaseError);
      } else {
        console.log("✅ Payment successfully processed in database:", {
          checkoutRequestId,
          resultCode: ResultCode,
          mpesaReceiptNumber,
          amount,
          status: ResultCode === 0 ? "success" : "failed"
        });
        dbSuccess = true;
      }

    } catch (dbError: unknown) {
      const error = dbError as DatabaseError;
      console.error("💥 Database operation exception:", {
        message: error?.message || 'Unknown database error',
        stack: error?.stack
      });
    }

    // Log final status
    if (!dbSuccess) {
      console.log("⚠️ Payment processed but not saved to database. CheckoutRequestID:", checkoutRequestId);
    }

    // Always return success to Safaricom
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });

  } catch (error: unknown) {
    const err = error as DatabaseError;
    console.error("💥 Callback processing error:", {
      message: err?.message || 'Unknown error',
      stack: err?.stack,
      checkoutRequestId
    });
    // Still return success to M-Pesa to avoid repeated callbacks
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  }
}