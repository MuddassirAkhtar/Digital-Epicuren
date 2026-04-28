import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const PartnerDetail = () => {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const user = React.useContext(AuthContext).user

  const handleAddToCart = async (item) => {
          // console.log(item)

    addToCart({
      id: `${partnerId}-${item.id}`,
      title: item.name,
      price: item.price,
      partnerName: partner ? partner.restaurantName : "Partner",
      currency: item.currency

    });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          foodItemId: item._id,
          quantity: 1,
          partnerName: partner ? partner.restaurantName : "Partner",
        },
        {
          withCredentials: true,
        }
      );
      navigate("/cart");
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  // fetching partners from backend
  const [partner, setPartner] = React.useState([]);

  useEffect(() => {
    async function getPartnersByID() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/partner/${partnerId}`,
          {},
        );
          // console.log(response.data);
        const data = response.data.data;
        setPartner(data);
      } catch (err) {
        console.log(err);
      }
    }

    getPartnersByID();
  }, []);


  //  fetching parteners menue from backend

  const [menue, setMenue] = useState([]);

  useEffect(() => {
    async function getMenue() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/menue/${partnerId}`,
          {},
        );

        const data = res.data.data;
        setMenue(data);
        
      } catch (err) {
        console.log(err);
      }
    }

    getMenue();
  }, []);

  // console.log(menue)


  // fetching reel count for the partner

  const [reelCount, setReelCount] = useState(0);

  useEffect(() => {
    async function getReelCount() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/reelcount/${partnerId}`
        );
        setReelCount(res.data.data);
      } catch (err) {
        console.error("Error fetching reel count:", err);
      }
    }

    if (partnerId) {
      getReelCount();
    }
  }, [partnerId]);

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Partner not found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find that partner. Please choose a different partner
            from the partners list.
          </p>
          <Link
            to="/partners"
            className="inline-flex px-5 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
          >
            Back to Partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">
              {partner.restaurantName}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Partner Menu & Reel
            </h1>
          </div>
          <Link
            to="/partners"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-orange-400 hover:text-orange-600 transition-colors"
            aria-label="Back to Partners"
          >
            ←
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-6 ">
             <div className="flex items-center  gap-2">
               <div className="w-16 h-16 rounded-3xl bg-orange-100 flex items-center justify-center text-4xl">
                {partner.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {partner.restaurantName}
                </h2>
                {/* <p className="text-sm text-gray-600 mt-1">{partner.description}</p> */}
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mt-2">
                  {partner.location}
                </p>
              </div>
             </div>


              

            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-orange-50 p-5 border border-orange-100 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  Menu Items
                </p>
                <p className="text-2xl font-bold text-gray-900">{menue?.length || 0}</p>
              </div>
              <div className="rounded-3xl bg-orange-50 p-5 border border-orange-100 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  Featured Reel
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {reelCount || "N/A"}
                </p>
              </div>
              <div className="rounded-3xl bg-orange-50 p-5 border border-orange-100 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  Delivery
                </p>
                <p className="text-2xl font-bold text-gray-900">30 min</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200">
            <div className="relative aspect-video bg-black">
              <img
                src={`https://images.unsplash.com/featured/?${encodeURIComponent(partner.name)}+food`}
                alt={`${partner.name} reel`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex items-center justify-center rounded-full bg-white/90 text-gray-900 w-20 h-20 shadow-2xl hover:scale-110 transition-transform">
                  ▶
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-600 mb-2">
                Featured Reel
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {partner.reel}
              </h3>
              <p className="mt-3 text-gray-600">
                Watch the partner’s latest food reel and discover their
                signature dishes in motion.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/reels")}
                  className="px-5 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                >
                  Watch Reel
                </button>
               {user && user.role === "partner" && user.id === partner._id && (
  <Link
    to={`/partners/${partner._id}/dashboard`}
    className="px-5 py-3 border border-orange-300 rounded-full text-orange-700 hover:bg-orange-50 transition-colors"
  >
    Partner Dashboard
  </Link>
)}
                {/* <button
                  onClick={() => {
                    const featuredItem = partner.menu[0];
                    addToCart({
                      id: `${partner.id}-${featuredItem.id}`,
                      title: featuredItem.title,
                      price: featuredItem.price,
                      partnerName: partner.name,
                      currency: featuredItem.currency
                    });
                    navigate("/cart");
                  }}
                  className="px-5 py-3 border border-gray-300 rounded-full text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
                >
                  Order from Partner
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="  rounded-3xl bg-white p-6 border border-gray-200 shadow-sm h-[600px] overflow-auto  noScrollbar"> 
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Menu from {partner.restaurantName}
            </h3>
            <div className="space-y-4">
              {menue?.map((item) => (
                <div key={item.id} className="rounded-3xl border border-gray-100 p-4 hover:border-orange-200 transition-colors">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-bold text-gray-900">{item.currency} {item.price.toFixed(2)}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="rounded-3xl bg-orange-50 p-6 border border-orange-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full py-3 bg-white border border-gray-200 rounded-2xl text-gray-800 hover:bg-orange-50 transition-colors">
                Save Partner
              </button>
              <button className="w-full py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-colors">
                Follow Partner
              </button>
            </div>
          </div> */}
        </aside>
      </div>
    </div>
  );
};

export default PartnerDetail;
