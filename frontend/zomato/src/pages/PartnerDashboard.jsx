import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { partners } from '../data/partners'

const PartnerDashboard = () => {
  const { partnerId } = useParams()
  const partner = partners.find((item) => item.id === partnerId)

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Partner Dashboard not found</h2>
          <p className="text-gray-600 mb-6">We couldn't locate this partner dashboard. Please return to the main partners list.</p>
          <Link to="/partners" className="inline-flex px-5 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
            Back to Partners
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">Partner Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{partner.name}</h1>
            <p className="text-gray-600 mt-2">Manage menu items, track sales, and monitor reel performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/partners/${partner.id}`}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              Back to Partner Page
            </Link>
            <button className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors">
              New listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Today's Orders</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">{Math.floor(20 + partner.menu.length * 3)}</p>
                <p className="text-sm text-gray-500 mt-2">Delivered and pending</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Revenue</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">${(Math.floor(3 + partner.menu.length * 2) * 120).toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Estimated today</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Menu Items</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">{partner.menu.length}</p>
                <p className="text-sm text-gray-500 mt-2">Live dishes</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Reel Views</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">{Math.floor(3000 + partner.menu.length * 450)}</p>
                <p className="text-sm text-gray-500 mt-2">Last 24 hours</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Menu Inventory</h2>
                  <p className="text-gray-600 mt-1">Update prices, view stock, and organize featured dishes.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors">
                  Add Dish
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {partner.menu.map((item, index) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.tag} • {item.price}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="rounded-full bg-white px-3 py-2 text-gray-700 shadow-sm">Status: {index % 3 === 0 ? 'Live' : 'Low stock'}</span>
                      <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Reel Performance</h3>
                  <p className="text-gray-600 mt-1">Track engagement and orders driven by the latest food reel.</p>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">Live</span>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">Views</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{Math.floor(1500 + partner.menu.length * 320)}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">Clicks</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{Math.floor(220 + partner.menu.length * 40)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <ul className="mt-5 space-y-4 text-sm text-gray-600">
                <li className="rounded-3xl bg-gray-50 p-4">New order placed for <span className="font-semibold text-gray-900">{partner.menu[0].title}</span>.</li>
                <li className="rounded-3xl bg-gray-50 p-4">Updated menu item <span className="font-semibold text-gray-900">{partner.menu[1]?.title || 'N/A'}</span>.</li>
                <li className="rounded-3xl bg-gray-50 p-4">Reel earned <span className="font-semibold text-gray-900">{Math.floor(80 + partner.menu.length * 10)}</span> saves.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default PartnerDashboard
