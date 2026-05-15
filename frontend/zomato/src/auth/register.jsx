import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../utility/titleCase";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    ownerName: "",
    restaurantName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "customer", // 'customer' or 'partner'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataToSend = {
      ...formData,
      phoneNumber: `+91 ${formData.phoneNumber}`,
    };

    //  Validate the password
    if (dataToSend.password !== dataToSend.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    //  remove unnecessary fields
    if (dataToSend.userType === "customer") {
      delete dataToSend.ownerName;
      delete dataToSend.resturentName;
      delete dataToSend.location;
      dataToSend.fullName = toTitleCase(dataToSend.fullName);
    }

    if (dataToSend.userType === "partner") {
      delete dataToSend.fullName;
      dataToSend.restaurantName = toTitleCase(dataToSend.restaurantName);
      dataToSend.location = toTitleCase(dataToSend.location);
      dataToSend.ownerName = toTitleCase(dataToSend.ownerName);
    }

    //  remove confirmPassword before sending
    delete dataToSend.confirmPassword;

    try {
      setLoading(true);
      setError("");

      const url =
        dataToSend.userType === "customer"
          ? `${import.meta.env.VITE_API_URL}/api/user/register`
          : `${import.meta.env.VITE_API_URL}/api/user/foodpartener/register`;

      await axios.post(url, dataToSend);

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
  };

  const handleFacebookSignup = () => {
    console.log("Facebook signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 py-8">
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
            <p className="text-sm text-gray-500">
              Join our culinary community.
            </p>
          </div>

          {/* Content Area */}
          <div className="px-6 py-8 md:px-8 md:py-10">
            {/* Create Account Heading */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Create an Account
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="customer"
                    checked={formData.userType === "customer"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-center transition-all hover:border-orange-500"
                    style={{
                      borderColor:
                        formData.userType === "customer"
                          ? "#ea580c"
                          : "#d1d5db",
                    }}
                  >
                    <span className="text-lg block">👤</span>
                    <span className="text-xs font-semibold text-gray-700 block mt-1">
                      I'm a Customer
                    </span>
                  </div>
                </label>

                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="partner"
                    checked={formData.userType === "partner"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-center transition-all hover:border-orange-500"
                    style={{
                      borderColor:
                        formData.userType === "partner" ? "#ea580c" : "#d1d5db",
                    }}
                  >
                    <span className="text-lg block">🍳</span>
                    <span className="text-xs font-semibold text-gray-700 block mt-1">
                      Restaurant Partner
                    </span>
                  </div>
                </label>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  {formData.userType === "customer"
                    ? "Full Name"
                    : "Owner Name"}
                </label>
                {formData.userType === "customer" ? (
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                ) : (
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="John Doe"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="gourmet@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* phoneNumber Field */}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="flex  gap-2 ">
                  {/* Country Code */}
                  <div className=" px-4 py-3 border border-black rounded-lg text-lg text-gray-900 placeholder-gray-400">
                    +91
                  </div>
                  <input
                    type="Number"
                    name="phoneNumber"
                    placeholder=""
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* fields for resturent partener */}

              {formData.userType === "partner" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Resturent Name
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      placeholder="Gourmet Delight"
                      value={formData.restaurantName || ""}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      location
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="123 Main Street, City"
                      value={formData.location || ""}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-sm text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </>
              )}

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 accent-orange-600 rounded cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3.5 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {loading ? "Creating Account..." : "Create an Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                OR SIGN UP WITH
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignup}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 font-semibold text-gray-700 text-sm md:text-base"
              >
                <span className="text-lg">🔍</span>
                <span className="hidden sm:inline">Google</span>
              </button>

              <button
                onClick={handleFacebookSignup}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Links - Mobile Optimized */}
        <div className="mt-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              PRIVACY
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/terms" className="hover:text-gray-700 transition-colors">
              TERMS
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/support"
              className="hover:text-gray-700 transition-colors"
            >
              SUPPORT
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            © 2024 Digital Epicurean Portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
