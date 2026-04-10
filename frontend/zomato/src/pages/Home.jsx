// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { partners } from '../data/partners'

// const Home = () => {
//   const [email, setEmail] = useState('')
// console.log("Home component rendered")
//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
//               <span className="text-2xl">🍽️</span>
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-[0.35em] text-orange-600">Digital Epicurean</p>
//               <h1 className="text-xl font-bold">Food reels & orders</h1>
//             </div>
//           </Link>

//           <div className="flex items-center gap-3">
//             <Link to="/login" className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 transition">
//               Sign In
//             </Link>
//             <Link to="/register" className="inline-flex items-center px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="pb-24">
//         <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 sm:py-16">
//           <div className="max-w-7xl mx-auto px-4 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
//                 <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
//                 Explore chef-curated reels
//               </div>
//               <div className="space-y-4">
//                 <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
//                   Discover food through <span className="text-orange-600">videos</span>.
//                 </h2>
//                 <p className="max-w-2xl text-gray-600 leading-relaxed">
//                   Experience the culture, the aroma, and the story of every cuisine through short, delicious food clips.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link to="/partners" className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-orange-700 transition">
//                   Explore Food
//                 </Link>
//                 <Link to="/register" className="inline-flex items-center justify-center rounded-full border border-orange-600 px-8 py-4 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition">
//                   Become a Partner
//                 </Link>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
//                 <div>
//                   <p className="text-2xl font-bold text-orange-600">500+</p>
//                   <p>Restaurants</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-orange-600">50K+</p>
//                   <p>Active Users</p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-orange-600">1M+</p>
//                   <p>Orders</p>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-[2rem] overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
//               <div className="relative aspect-[16/9] bg-slate-900">
//                 <img
//                   src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
//                   alt="Featured food"
//                   className="absolute inset-0 h-full w-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
//                 <div className="absolute inset-0 flex items-end p-6">
//                   <div className="rounded-3xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
//                     <p className="text-xs uppercase tracking-[0.35em] text-orange-600">Featured Food</p>
//                     <h3 className="mt-2 text-2xl font-bold text-slate-900">The Intal Wood Fired Neapolitan Pizza</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="py-10 sm:py-14">
//           <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm uppercase tracking-[0.35em] text-orange-600">Our Partners</p>
//               <h2 className="mt-3 text-3xl font-bold text-gray-900">Trusted restaurant collections</h2>
//             </div>
//             <Link to="/partners" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
//               View All →
//             </Link>
//           </div>

//           <div className="mt-8 max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {partners.map((partner) => (
//               <Link
//                 key={partner.id}
//                 to={`/partners/${partner.id}`}
//                 className="group overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
//               >
//                 <div className="aspect-[4/3] bg-slate-900 flex items-end p-6" style={{ backgroundImage: `url(https://images.unsplash.com/featured/?${encodeURIComponent(partner.name)}+restaurant)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                   <div className="rounded-3xl bg-black/60 p-4">
//                     <p className="text-xs uppercase tracking-[0.35em] text-orange-400">{partner.location}</p>
//                     <h3 className="mt-2 text-xl font-bold">{partner.name}</h3>
//                   </div>
//                 </div>
//                 <div className="space-y-3 p-6 bg-white text-slate-900">
//                   <p className="text-sm text-slate-500">{partner.description}</p>
//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">{partner.menu.length} menu items</span>
//                     <span className="font-semibold text-orange-600">View Reel →</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         <section className="py-12 bg-slate-950 text-white">
//           <div className="max-w-7xl mx-auto px-4 rounded-[2rem] bg-gradient-to-r from-orange-600 to-orange-500 p-10 shadow-2xl">
//             <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
//               <div>
//                 <p className="text-sm uppercase tracking-[0.35em] text-orange-200">Are you a chef?</p>
//                 <h2 className="mt-4 text-4xl font-bold">Create your own restaurant page and grow with video orders.</h2>
//                 <p className="mt-4 max-w-xl text-orange-100/90 leading-relaxed">
//                   Showcase signature dishes, share food reels, and connect with customers directly through the Digital Epicurean partner experience.
//                 </p>
//               </div>
//               <div className="flex items-center justify-center">
//                 <Link to="/register" className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-orange-600 shadow-lg hover:bg-orange-50 transition">
//                   Join as Partner
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default Home


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { partners } from '../data/partners'

const Home = () => {
  const [email, setEmail] = useState('')

  const restaurants = [
    {
      id: 1,
      name: 'Gourmet Burgers',
      image: '🍔',
      description: 'Premium beef burgers with fresh ingredients',
      rating: 4.8,
      reviews: 2543
    },
    {
      id: 2,
      name: 'Asian Fusion',
      image: '🍜',
      description: 'Traditional Asian cuisine with modern twist',
      rating: 4.9,
      reviews: 1876
    },
    {
      id: 3,
      name: 'Artisan Pizza',
      image: '🍕',
      description: 'Authentic wood-fired pizzas',
      rating: 4.7,
      reviews: 3421
    }
  ]

  const cuisines = [
    { id: 1, name: 'Italian', icon: '🇮🇹', count: 245 },
    { id: 2, name: 'Asian', icon: '🥢', count: 189 },
    { id: 3, name: 'American', icon: '🍔', count: 167 },
    { id: 4, name: 'Mexican', icon: '🌮', count: 134 },
    { id: 5, name: 'Indian', icon: '🧂', count: 201 },
    { id: 6, name: 'Mediterranean', icon: '🫒', count: 98 }
  ]

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">🍽️</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">
              Digital Epicurean
            </h1>
          </Link>
          
          <div className="flex items-center gap-3">
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
                Discover food through <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">videos</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience culinary excellence with our curated collection of restaurants. Watch cooking videos, read reviews, and order your favorite meals.
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
            <p className="text-gray-600">Discover our hand-picked selection of finest dining establishments</p>
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
                      <span className="font-bold text-gray-900">{restaurant.rating}</span>
                      <span className="text-sm text-gray-600">({restaurant.reviews.toLocaleString()})</span>
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
                <div className="text-5xl mb-3">
                  {cuisine.icon}
                </div>
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
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Partners</h3>
              <p className="text-gray-600">Trusted by the best restaurants and chefs.</p>
            </div>
            <Link
              to="/partners"
              className="px-6 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              Explore All Partners
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.slice(0, 4).map((partner) => (
              <Link
                key={partner.id}
                to={`/partners/${partner.id}`}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:from-orange-50 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                  {partner.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {partner.description}
                </p>
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
                Join thousands of talented chefs already partnering with Digital Epicurean. Grow your culinary brand and reach food lovers worldwide.
              </p>
            </div>

            {/* Right - Benefits */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">📈</div>
                <h4 className="text-xl font-bold text-white mb-2">Grow Your Reach</h4>
                <p className="text-gray-300">
                  Access thousands of potential customers and expand your business
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="text-xl font-bold text-white mb-2">Competitive Rates</h4>
                <p className="text-gray-300">
                  Earn more with our fair commission structure and flexible payment options
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-xl font-bold text-white mb-2">Marketing Support</h4>
                <p className="text-gray-300">
                  Get featured with our video marketing and promotional campaigns
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
            Get exclusive deals, new restaurant launches, and culinary tips delivered to your inbox
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
                Discover culinary excellence through videos and authentic food experiences.
              </p>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-bold text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-bold text-white mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Safety</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-bold text-white mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Accessibility</a></li>
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
  )
}

export default Home