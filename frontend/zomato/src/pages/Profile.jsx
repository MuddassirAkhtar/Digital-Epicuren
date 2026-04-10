import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (415) 555-0132',
    location: 'San Francisco, CA',
    dob: '1995-08-15'
  })

  const [editData, setEditData] = useState(formData)

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', name: 'Visa ending in 4242', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', name: 'Mastercard ending in 5555', isDefault: false }
  ]

  const addresses = [
    { id: 1, type: 'Home', address: '123 Main St, San Francisco, CA 94102', isDefault: true },
    { id: 2, type: 'Work', address: '456 Market St, San Francisco, CA 94103', isDefault: false }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    setFormData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(formData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ✕
          </Link>
        </div>
      </div>

      {/* User Info Card */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-4xl">👨</span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {formData.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">📍 {formData.location}</p>
              <p className="text-xs text-gray-500">Joined March 2021 • Member for 3+ years</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 border-t pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">24</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Favorites</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-md sticky top-16 z-20">
          <div className="grid grid-cols-3 border-b">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-4 px-4 font-semibold text-center transition-all border-b-2 ${
                activeTab === 'personal'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-4 px-4 font-semibold text-center transition-all border-b-2 ${
                activeTab === 'payments'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-4 px-4 font-semibold text-center transition-all border-b-2 ${
                activeTab === 'addresses'
                  ? 'text-orange-600 border-orange-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Addresses
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-md p-6 mb-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              {!isEditing ? (
                // View Mode
                <>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Full Name</p>
                      <p className="text-lg text-gray-900">{formData.name}</p>
                    </div>

                    <div className="pb-4 border-b">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Email Address</p>
                      <p className="text-lg text-gray-900">{formData.email}</p>
                    </div>

                    <div className="pb-4 border-b">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Phone Number</p>
                      <p className="text-lg text-gray-900">{formData.phone}</p>
                    </div>

                    <div className="pb-4 border-b">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Location</p>
                      <p className="text-lg text-gray-900">{formData.location}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Date of Birth</p>
                      <p className="text-lg text-gray-900">
                        {new Date(formData.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Edit Information
                  </button>
                </>
              ) : (
                // Edit Mode
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={editData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCancel}
                      className="py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">💳</div>
                      <div>
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.type}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full py-3 border-2 border-dashed border-orange-300 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all mt-4">
                + Add Payment Method
              </button>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">📍</div>
                      <div>
                        <p className="font-semibold text-gray-900">{address.type}</p>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                    </div>
                    {address.isDefault && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full py-3 border-2 border-dashed border-orange-300 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all mt-4">
                + Add New Address
              </button>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="bg-red-50 rounded-xl p-6 mb-6 border border-red-200">
          <button className="w-full py-3 text-red-600 font-bold hover:text-red-700 transition-colors">
            🚪 Logout
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">Version 0.2.1 • Epicurean</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
