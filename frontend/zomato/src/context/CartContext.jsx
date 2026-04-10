import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

const normalizePrice = (price) => Number(String(price).replace(/[^0-9.]/g, '')) || 0

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + normalizePrice(item.price) * item.quantity,
    0
  )

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, cartCount, totalAmount }),
    [cartItems, cartCount, totalAmount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
