import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalAmount } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">Cart</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your order basket</h1>
          </div>
          <Link
            to="/reels"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-orange-700 transition-colors"
          >
            Browse Reels
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm border border-gray-200">
            <p className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty.</p>
            <p className="text-gray-600 mb-6">Add a delicious item from a partner reel or menu to begin ordering.</p>
            <Link
              to="/reels"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
            >
              Explore Reels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="grid gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.partnerName}</p>
                      <p className="text-sm text-gray-500 mt-2">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-900">{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Order total</p>
                <p className="text-3xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={clearCart}
                  className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Clear Cart
                </button>
                <button className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
