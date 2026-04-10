import React from 'react'
import { Link } from 'react-router-dom'
import { partners } from '../data/partners'
import { useCart } from '../context/CartContext'

const Reels = () => {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">Reel Feed</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Scroll partner food reels</h1>
          </div>
          <Link
            to="/partners"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-orange-700 transition-colors"
          >
            Browse Partners
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {partners.map((partner) => {
          const featuredItem = partner.menu[0]
          return (
            <article
              key={partner.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/9] bg-gray-900">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/featured/?${encodeURIComponent(
                      partner.name
                    )}+food)`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-gray-900 text-4xl shadow-2xl">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-orange-300">{partner.location}</p>
                  <h2 className="text-3xl font-bold leading-tight">{partner.reel}</h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{partner.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                    Reel
                  </span>
                </div>

                <p className="text-gray-600">{partner.reelDescription}</p>

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    onClick={() =>
                      addToCart({
                        id: `${partner.id}-${featuredItem.id}`,
                        title: featuredItem.title,
                        price: featuredItem.price,
                        partnerName: partner.name
                      })
                    }
                    className="w-full rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
                  >
                    Add {featuredItem.title} to cart
                  </button>
                  <Link
                    to={`/partners/${partner.id}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-orange-600 px-5 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    View Partner
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Reels
