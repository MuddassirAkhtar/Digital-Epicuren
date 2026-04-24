import React from 'react'
import { Link } from 'react-router-dom'
// import { partners } from '../data/partners'
import { useEffect } from 'react'
import axios from "axios"
import { get } from 'react-hook-form'





const Partners = () => {

  const [partners, setPartners] = React.useState([])

  useEffect(() => {

  async function getAllPartners (){
    
   try{
     const  response = await axios.get("http://localhost:3000/api/food/partners",{
      withCredentials:true
    })
    console.log(response.data)
      const data = response.data.data;
      setPartners(data);
   }catch(err){
      console.log(err)
   }
  }

 getAllPartners()
}, [])
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">Digital Epicurean</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Curated Collections</h1>
          </div>
          <Link
            to="/profile"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg"
          >
            👤
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore All Partners</h2>
            <p className="text-gray-600 mt-2">Browse partner restaurants and discover their curated menus and food reels.</p>
          </div>
          <Link
            to="/"
            className="px-5 py-3 bg-white border border-gray-200 text-gray-800 rounded-full shadow-sm hover:border-orange-400 hover:text-orange-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners?.map((partner, index) => (
            <Link
              key={index}
              to={`/partners/${partner._id}`}
              className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{partner.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{partner.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">{partner.restaurantName}</h3>
                <p className="text-sm text-gray-600 mb-5">{partner.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {/* <span className="font-semibold">{partner.menu.length} menu items</span> */}
                  <span className="text-orange-600 font-semibold">View Reel →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Partners
