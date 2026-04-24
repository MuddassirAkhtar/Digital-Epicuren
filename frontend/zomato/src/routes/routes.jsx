import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../auth/login'
import Register from '../auth/register'
import Profile from '../pages/Profile'
import Partners from '../pages/Partners'
import PartnerDetail from '../pages/PartnerDetail'
import PartnerDashboard from '../pages/PartnerDashboard'
import Reels from '../pages/Reels'
import Cart from '../pages/Cart'
import BottomNavigation from '../components/BottomNavigation'
import { CartProvider } from '../context/CartContext'
import ProtectedRoute from './ProtectedRoute'
import { AuthContext } from '../context/authContext'


const AppRoutes = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const isReelsPage = location.pathname.startsWith('/reel')
 const user = React.useContext(AuthContext).user
  return (
    <CartProvider>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/partners' element={<Partners />} />
          <Route path='/partners/:partnerId' element={<PartnerDetail />} />
<Route
  path='/partners/:partnerId/dashboard'
  element={
    <ProtectedRoute user={user}>
      <PartnerDashboard />
    </ProtectedRoute>
  }
/>          
        <Route path='/reels' element={<Reels />} />
          <Route path='/reel/:reelId' element={<Reels />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        {!isAuthPage && !isReelsPage && <BottomNavigation />}
      </>
    </CartProvider>
  )
}

export default AppRoutes
