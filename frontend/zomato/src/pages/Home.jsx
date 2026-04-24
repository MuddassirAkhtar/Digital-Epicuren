import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { partners } from "../data/partners";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [partners, setPartners] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("https://digital-epicuren.onrender.com/api/user/logout", {
        withCredentials: true,
      });
      setUser(null); // Clear user from context
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const restaurants = [
    {
      id: 1,
      name: "Gourmet Burgers",
      image: "🍔",
      description: "Premium beef burgers with fresh ingredients",
      rating: 4.8,
      reviews: 2543,
    },
    {
      id: 2,
      name: "Asian Fusion",
      image: "🍜",
      description: "Traditional Asian cuisine with modern twist",
      rating: 4.9,
      reviews: 1876,
    },
    {
      id: 3,
      name: "Artisan Pizza",
      image: "🍕",
      description: "Authentic wood-fired pizzas",
      rating: 4.7,
      reviews: 3421,
    },
  ];

  const cuisines = [
    { id: 1, name: "Italian", icon: "🇮🇹", count: 245 },
    { id: 2, name: "Asian", icon: "🥢", count: 189 },
    { id: 3, name: "American", icon: "🍔", count: 167 },
    { id: 4, name: "Mexican", icon: "🌮", count: 134 },
    { id: 5, name: "Indian", icon: "🧂", count: 201 },
    { id: 6, name: "Mediterranean", icon: "🫒", count: 98 },
  ];

  useEffect(() => {
    async function getPartners() {
      try {
        const response = await axios.get(
          "https://digital-epicuren.onrender.com/api/food/partners",
        );
        setPartners(response.data.data);
        // console.log(partners);
      } catch (err) {
        console.log(err);
      }
    }

    getPartners();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT SIDE (Always visible) */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">🍽️</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">
              Digital Epicurean
            </h1>
          </Link>

          {/* RIGHT SIDE (Dynamic) */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:block font-medium text-gray-700">
                  Hi, {user?.fullName.split(" ")[0] }!
                </span>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-block px-6 py-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover food through{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  videos
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience culinary excellence with our curated collection of
                restaurants. Watch cooking videos, read reviews, and order your
                favorite meals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold text-center rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Explore now
                </Link>
                <Link
                  to="/partners"
                  className="flex-1 sm:flex-none px-8 py-4 border-2 border-orange-600 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-md text-center"
                >
                  Browse Partners
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-3xl font-bold text-orange-600">500+</p>
                  <p className="text-sm text-gray-600">Restaurants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">50K+</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">1M+</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
              </div>
            </div>

            {/* Right Image/Video */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-9xl">🍔</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                <button className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <span className="text-4xl">▶️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore Trending Restaurants
            </h3>
            <p className="text-gray-600">
              Discover our hand-picked selection of finest dining establishments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-7xl relative overflow-hidden">
                  {restaurant.image}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {restaurant.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {restaurant.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-lg">⭐</span>
                      <span className="font-bold text-gray-900">
                        {restaurant.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({restaurant.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 active:scale-95">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Cuisines */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore by Cuisine
            </h3>
            <p className="text-gray-600">Find your favorite type of cuisine</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.id}
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-5xl mb-3">{cuisine.icon}</div>
                <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {cuisine.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {cuisine.count} restaurants
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Our Partners
              </h3>
              <p className="text-gray-600">
                Trusted by the best restaurants and chefs.
              </p>
            </div>
            <Link
              to="/partners"
              className="px-6 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              Explore All Partners
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.slice(3, 7).map((partner) => (
              <Link
                key={partner._id}
                to={`/partners/${partner._id}`}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:from-orange-50 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                  {partner.icon} 🍽️
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.restaurantName}
                </h4>
                <p className="text-sm text-gray-600">{partner.description} "A place where great food meets great vibes."   </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Signup Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Chef Icon */}
            <div className="text-center md:text-left">
              <div className="text-8xl md:text-9xl mb-4">👨‍🍳</div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Are you a Chef?
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Join thousands of talented chefs already partnering with Digital
                Epicurean. Grow your culinary brand and reach food lovers
                worldwide.
              </p>
            </div>

            {/* Right - Benefits */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">📈</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Grow Your Reach
                </h4>
                <p className="text-gray-300">
                  Access thousands of potential customers and expand your
                  business
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Competitive Rates
                </h4>
                <p className="text-gray-300">
                  Earn more with our fair commission structure and flexible
                  payment options
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Marketing Support
                </h4>
                <p className="text-gray-300">
                  Get featured with our video marketing and promotional
                  campaigns
                </p>
              </div>

              <Link
                to="/register?type=partner"
                className="inline-block w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-center"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-8">
            Get exclusive deals, new restaurant launches, and culinary tips
            delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">🍽️</span>
                </div>
                <span className="font-bold text-white">Digital Epicurean</span>
              </div>
              <p className="text-sm">
                Discover culinary excellence through videos and authentic food
                experiences.
              </p>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-bold text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-bold text-white mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Safety
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-bold text-white mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-400">
                © 2024 Digital Epicurean. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-orange-500 transition-colors">
                  📘 Facebook
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  🐦 Twitter
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  📷 Instagram
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  ▶️ YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
