'use client'

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

const predefinedPrices = [100, 500, 1000, 2000, 3000, 5000]

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 5000,
    image: "🎧",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced smartwatch with heart rate monitoring, GPS, and waterproof design.",
    price: 3000,
    image: "⌚",
    category: "Wearables"
  },
  {
    id: 3,
    name: "Wireless Earbuds Pro",
    description: "Compact true wireless earbuds with crystal clear sound and charging case.",
    price: 2000,
    image: "🔊",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Phone Case - Premium",
    description: "Durable protective case with military-grade drop protection.",
    price: 500,
    image: "📱",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery.",
    price: 1500,
    image: "🔈",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting and programmable buttons.",
    price: 800,
    image: "🖱️",
    category: "Gaming"
  }
]

interface PaymentState {
  loading: boolean
  success: boolean
  error: string
  transactionId?: string
}

const normalizePhone = (input: string): string => {
  const cleaned = input.replace(/\s+/g, '').replace(/[^0-9+]/g, '')

  if (cleaned.startsWith('+254')) return cleaned.slice(1)
  if (cleaned.startsWith('07')) return '254' + cleaned.slice(1)
  if (cleaned.startsWith('254')) return cleaned
  return cleaned
}

export default function Home() {
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [modalPhone, setModalPhone] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [paymentState, setPaymentState] = useState<PaymentState>({
    loading: false,
    success: false,
    error: ''
  })

  const handleSubmit = async (
    e: FormEvent,
    customAmount = amount,
    customPhone = phone,
    product: Product | null = null,
    closeModal = false
  ): Promise<void> => {
    e.preventDefault()
    
    setPaymentState({ loading: true, success: false, error: '' })
    const loadingToast = toast.loading('Initiating M-Pesa payment...')

    try {
      const normalizedPhone = normalizePhone(customPhone)
      const amountNumber = parseInt(customAmount)

      // Validate amount
      if (amountNumber < 1) {
        throw new Error('Amount must be at least 1 KSH')
      }

      // Prepare request payload
      const payload = {
        phoneNumber: normalizedPhone,
        amount: amountNumber,
        accountReference: "BuyGoods Store",
        transactionDesc: product ? `Purchase: ${product.name}` : "Goods Purchase",
        productName: product?.name,
        quantity: 1
      }

      const res = await fetch('/api/stk-push', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.details || 'Payment initiation failed')
      }

      if (data.success) {
        setPaymentState({ 
          loading: false, 
          success: true, 
          error: '',
          transactionId: data.data.checkoutRequestID
        })
        
        toast.success('✅ STK Push sent! Check your phone to complete payment.', { 
          id: loadingToast,
          duration: 5000 
        })

        // Reset forms
        if (closeModal) {
          setTimeout(() => {
            setModalOpen(false)
            setModalPhone('')
            setSelectedAmount(null)
            setSelectedProduct(null)
            setPaymentState({ loading: false, success: false, error: '' })
          }, 2000)
        } else {
          setPhone('')
          setAmount('')
          setTimeout(() => {
            setPaymentState({ loading: false, success: false, error: '' })
          }, 3000)
        }
      } else {
        throw new Error(data.error || 'Payment initiation failed')
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Payment error:', errorMessage)
      
      setPaymentState({ 
        loading: false, 
        success: false, 
        error: errorMessage 
      })
      
      toast.error(`❌ ${errorMessage}`, { 
        id: loadingToast,
        duration: 5000 
      })
    }
  }

  const handleBoxClick = (price: number): void => {
    setSelectedAmount(price)
    setSelectedProduct(null)
    setModalPhone('')
    setPaymentState({ loading: false, success: false, error: '' })
    setModalOpen(true)
  }

  const handleProductPurchase = (product: Product): void => {
    setSelectedAmount(product.price)
    setSelectedProduct(product)
    setModalPhone('')
    setPaymentState({ loading: false, success: false, error: '' })
    setModalOpen(true)
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setModalPhone('')
    setSelectedAmount(null)
    setSelectedProduct(null)
    setPaymentState({ loading: false, success: false, error: '' })
  }

  const isProduction = process.env.NEXT_PUBLIC_MPESA_ENVIRONMENT === 'production'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 py-20">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">EPIC SOFTWARES</h1>
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">Joseph Owang Oduor</h1>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          M-Pesa STK Push Integration
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Experience seamless mobile payments with our BuyGoods integration. 
          Enter your phone number and amount to receive an STK push prompt directly on your phone.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left Column - Payment Forms */}
        <div className="space-y-8">
          {/* Custom Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Custom Payment</h2>
            <form onSubmit={(e) => handleSubmit(e, amount, phone)} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone-input" className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phone-input"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white text-emerald-700"
                  placeholder="07XX XXX XXX or 2547XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={paymentState.loading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="amount-input" className="text-sm font-medium text-gray-700">Amount (KES)</label>
                <input
                  id="amount-input"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white text-emerald-700"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                  disabled={paymentState.loading}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed disabled:transform-none hover:transform hover:-translate-y-0.5"
                disabled={paymentState.loading}
              >
                {paymentState.loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </>
                ) : (
                  'Send Payment Request'
                )}
              </button>
            </form>

            {/* Payment Status */}
            {paymentState.success && (
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mt-4 font-medium">
                ✅ Payment initiated! Check your phone for STK push prompt.
                {paymentState.transactionId && (
                  <div className="text-xs mt-1 opacity-80">
                    ID: {paymentState.transactionId}
                  </div>
                )}
              </div>
            )}
            {paymentState.error && (
              <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mt-4 font-medium">
                ❌ {paymentState.error}
              </div>
            )}
          </div>

          {/* Quick Payment Boxes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Payment Amounts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {predefinedPrices.map((price) => (
                <button
                  key={price} 
                  type="button"
                  className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:transform hover:-translate-y-1 user-select-none"
                  onClick={() => handleBoxClick(price)}
                  disabled={paymentState.loading}
                >
                  <span className="text-sm font-semibold text-gray-600 block">KES</span>
                  <span className="text-xl font-bold text-blue-800 block">{price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm border-b border-gray-200 relative">
                  <div className="text-5xl opacity-80">
                    {product.image}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">KES {product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleProductPurchase(product)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 disabled:bg-green-400 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={paymentState.loading}
                      type="button"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Complete Your Purchase</h3>
            
            {selectedProduct && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4 border-l-4 border-blue-500">
                <strong className="text-gray-900">{selectedProduct.name}</strong>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedProduct.description}
                </div>
              </div>
            )}
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              You&apos;re about to pay <strong className="text-gray-900">KES {selectedAmount?.toLocaleString()}</strong>. 
              Enter your phone number to receive the M-Pesa prompt.
            </p>
            
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="modal-phone-input" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="modal-phone-input"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white"
                placeholder="07XX XXX XXX"
                value={modalPhone}
                onChange={(e) => setModalPhone(e.target.value)}
                required
                disabled={paymentState.loading}
              />
            </div>

            {/* Payment Status in Modal */}
            {paymentState.success && (
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 font-medium">
                ✅ Payment initiated! Check your phone.
              </div>
            )}
            {paymentState.error && (
              <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 font-medium">
                ❌ {paymentState.error}
              </div>
            )}
            
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed disabled:transform-none hover:transform hover:-translate-y-0.5"
                onClick={(e) =>
                  handleSubmit(e, String(selectedAmount ?? ''), modalPhone, selectedProduct, true)
                }
                disabled={paymentState.loading || !modalPhone}
                type="button"
              >
                {paymentState.loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </>
                ) : (
                  `Pay KES ${selectedAmount?.toLocaleString()}`
                )}
              </button>
              <button 
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none hover:transform hover:-translate-y-0.5"
                onClick={handleModalClose}
                disabled={paymentState.loading}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Notice */}
      <div className="bg-amber-100 border border-amber-300 rounded-xl p-4 text-center max-w-7xl mx-auto mt-10 px-4">
        <p className="text-amber-800 font-medium mb-1">
          📱 Phone number must start with 07... or 254... | 
          💰 Minimum amount: 1 KSH | 
        </p>
        <p className="text-amber-700 text-sm">
          Using {isProduction ? 'Production' : 'Sandbox'} Environment • 
          Business ShortCode: {process.env.NEXT_PUBLIC_MPESA_BUSINESS_SHORTCODE || '3213248'} • 
          Callback: {process.env.NEXT_PUBLIC_MPESA_CALLBACK_URL || 'Configured in API'}
        </p>
        <a 
          href="https://wa.me/254768131905?text=Hello%20Joseph%2C%20I%20would%20like%20to%20inquire%20about..." 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          JOSEPH ODUOR OWANG: 07-68-131-905
        </a>
      </div>
    </main>
  )
}