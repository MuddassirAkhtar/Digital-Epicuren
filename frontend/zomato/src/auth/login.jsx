import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const navigate = useNavigate()
  const { checkAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [popupEmail, setPopupEmail] = useState('')
  const [popupLoading, setPopupLoading] = useState(false)
  const [popupError, setPopupError] = useState('')
  const [popupSuccess, setPopupSuccess] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError('');

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/login`,
      { email, password },
      { withCredentials: true }
    );

    const userData = response.data;

    // console.log('Login successful:', userData);

    // Store email temporarily for OTP verification
    localStorage.setItem('pendingEmail', email);
    // Update auth context immediately
    await checkAuth();
    // Redirect to OTP verification page
    navigate('/verify-otp', { state: { email } });

  } catch (err) {
    console.error(err);

    if (err.response) {
      setError(err.response.data?.message || 'Invalid credentials');
    } else if (err.request) {
      setError('Server not responding');
    } else {
      setError('Something went wrong');
    }

  } finally {
    setLoading(false);
  }
};
  

  const handleGoogleLogin = () => {
    console.log('Google login')
  }

  const handleFacebookLogin = () => {
    console.log('Facebook login')
  }

  const handleForgotPassword = async () => {
    if (!popupEmail) {
      setPopupError('Please enter your email')
      return
    }

    try {
      setPopupLoading(true)
      setPopupError('')
      setPopupSuccess('')

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/forgot-password`,
        { email: popupEmail },
        { withCredentials: true }
      )

      setPopupSuccess('Password reset link sent to your email!')
      setTimeout(() => {
        setShowPopup(false)
        setPopupEmail('')
        setPopupSuccess('')
      }, 2000)
    } catch (err) {
      console.error(err)
      if (err.response) {
        setPopupError(err.response.data?.message || 'Failed to send reset link')
      } else if (err.request) {
        setPopupError('Server not responding')
      } else {
        setPopupError('Something went wrong')
      }
    } finally {
      setPopupLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Card with Shadow - PWA Optimized */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Logo Area */}
          <div className="bg-gradient-to-b from-orange-50 to-white px-6 pt-8 pb-6 text-center">
            {/* Logo Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">🍽️</span>
            </div>
            
            {/* Brand Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Digital Epicurean
            </h1>
            <p className="text-sm text-gray-500">Refined flavors, curated for you.</p>
          </div>

          {/* Content Area */}
          <div className="px-6 py-8 md:px-8 md:py-10">
            {/* Sign In Heading */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Sign In
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="gourmet@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3.5 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 font-semibold text-gray-700 text-sm md:text-base"
              >
                <span className="text-lg">🔍</span>
                <span className="hidden sm:inline">Google</span>
              </button>
              
              <button
                onClick={handleFacebookLogin}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-semibold text-gray-700 text-sm md:text-base"
              >
                <span className="text-lg">f</span>
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-5 md:px-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Links - Mobile Optimized */}
        <div className="mt-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-700 transition-colors">
              PRIVACY
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/terms" className="hover:text-gray-700 transition-colors">
              TERMS
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/support" className="hover:text-gray-700 transition-colors">
              SUPPORT
            </Link>
          </div>
          <p className="text-xs text-gray-400">© 2024 Digital Epicurean Portfolio</p>
        </div>
      </div>

      {/* Email Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Verify Email</h3>
            
            {popupError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {popupError}
              </div>
            )}

            {popupSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {popupSuccess}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={popupEmail}
                onChange={(e) => setPopupEmail(e.target.value)}
                disabled={popupLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPopup(false)
                  setPopupEmail('')
                  setPopupError('')
                  setPopupSuccess('')
                }}
                disabled={popupLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                disabled={popupLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {popupLoading ? 'Sending...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}


export default Login