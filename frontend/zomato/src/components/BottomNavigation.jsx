import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const BottomNavigation = () => {
  const location = useLocation()
  const { cartCount } = useCart()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path || location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex items-center justify-around h-16 max-w-7xl mx-auto px-4">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
            isActive('/') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-semibold">Home</span>
        </Link>

        <Link
          to="/reels"
          className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
            isActive('/reels') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <span className="text-2xl mb-1">🎬</span>
          <span className="text-xs font-semibold">Reels</span>
        </Link>

        <Link
          to="/partners"
          className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
            isActive('/partners') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <span className="text-2xl mb-1">🍴</span>
          <span className="text-xs font-semibold">Partners</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
            isActive('/cart') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <span className="text-2xl mb-1">🛒</span>
          <span className="text-xs font-semibold">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
            isActive('/profile') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <span className="text-2xl mb-1">👤</span>
          <span className="text-xs font-semibold">Profile</span>
        </Link>
      </div>
    </nav>
  )
}

export default BottomNavigation
