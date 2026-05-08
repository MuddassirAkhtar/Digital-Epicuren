import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios' // ✅ plain axios for auth calls
import api from '../utils/axiosInstance'
import { useAuth } from '../context/authContext'

const OtpVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [email, setEmail] = useState('')

  const { restoreSession } = useAuth() // ✅ grab restoreSession instead of login

  useEffect(() => {
    const emailData = location.state?.email || localStorage.getItem('pendingEmail')
    if (!emailData) {
      navigate('/login')
      return
    }
    setEmail(emailData)
  }, [navigate, location])

  useEffect(() => {
    if (!email) return;

    const handleOtpFlow = async () => {
      try {
        const statusResponse = await api.get(
          `/api/auth/check-verification-status`,
          { params: { email } }
        );

        if (statusResponse.data.isPhoneNumberVerified) {
          navigate("/");
          return;
        }

        await api.post(`/api/auth/send-otp`, { email });

      } catch (err) {
        console.error("OTP flow failed:", err);
      }
    };

    handleOtpFlow();
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      // ✅ Step 1: Verify the OTP
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { email, otp: otpCode },
        { withCredentials: true }
      )

      // ✅ Step 2: Now call restoreSession
      // The refreshToken cookie is already set from login
      // This calls /api/auth/refresh → gets accessToken → sets api.accessToken
      await restoreSession()

      // ✅ Step 3: Clean up
      sessionStorage.removeItem('tempAccessToken') // clean up just in case
      localStorage.removeItem('pendingEmail')

      setSuccess('OTP verified successfully!')

      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (err) {
      console.error(err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Failed to verify OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      await api.post(`/api/auth/resend-otp`, { email })

      setSuccess('OTP sent successfully! Check your email.')
      setResendTimer(60)
      setOtp(['', '', '', '', '', ''])

    } catch (err) {
      console.error(err)
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // JSX completely unchanged
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-b from-orange-50 to-white px-6 pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">🔐</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
          </div>

          <div className="px-6 py-8 md:px-8 md:py-10">
            <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-gray-600">
                Verification code sent to:<br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                ✓ {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                ✕ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  Enter OTP
                </label>
                <div className="flex gap-1 sm:gap-2 md:gap-3 justify-center text-black">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 border-2 border-gray-300 rounded-lg text-center text-lg sm:text-xl md:text-2xl font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200"
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3.5 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-3">
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Didn't receive the code?"}
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || loading}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-5 md:px-8 border-t border-gray-200 text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-gray-700 transition-colors">PRIVACY</a>
            <span className="text-gray-300">•</span>
            <a href="/terms" className="hover:text-gray-700 transition-colors">TERMS</a>
            <span className="text-gray-300">•</span>
            <a href="/support" className="hover:text-gray-700 transition-colors">SUPPORT</a>
          </div>
          <p className="text-xs text-gray-400">© 2024 Digital Epicurean Portfolio</p>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification