import {React, useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { toTitleCase } from '../utility/titleCase'
import axios from 'axios'
import { set } from 'react-hook-form'

const PartnerDashboard = () => {
  const { partnerId } = useParams()
  const [openForm, setopenForm] = useState(false)
  const [partner, setPartner] = useState(null)  
  const [menue , setMenue] = useState(null)
  const [activeItemID, setActiveItemID] = useState(null)
  const [tempStatus, setTempStatus] = useState("")
  const [openRellForm, setopenRellForm] = useState(false)
  const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  quantity: '',
  cuisine: '',
  currency: 'INR',
  quantityUnit: '',
  image: null
})

const [reelData, setReelData] = useState({
  reelName: '',
  description: '',
  video: null,
  foodItemId: '',
})

console.log("reelData:", reelData)


const handleReelChange = (e) => {
  const { name, type, files, value } = e.target

  setReelData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value
  }))
}






  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({  ...prevData, [name]: value }))
  }

  

  const handleFileChange = (e) => {
  const { name, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: files[0],
  }));
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", toTitleCase(formData.name));
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("cuisine", formData.cuisine);
    data.append("currency", formData.currency);
    data.append("quantityUnit", formData.quantityUnit);
    data.append("image", formData.image);

    const response = await fetch(`https://digital-epicuren.onrender.com/api/food/addmenueitem/${partnerId}`, {
      method: "POST",
      body: data,
        credentials: "include", // 🔥 IMPORTANT

      
    });

    const result = await response.json();

    setopenForm(false);

  } catch (error) {
    console.error("❌ Error:", error);
  }
};


const handleInput = (id, currentStatus) => {
  setActiveItemID(id)
  setTempStatus(currentStatus)
}

const handleStatusChange = async (e, itemId) => {
  const newStatus = e.target.value
  setTempStatus(newStatus)

  try {
    await axios.patch(
      `https://digital-epicuren.onrender.com/api/food/menueitem/${partnerId}/status/${itemId}`,
      { status: newStatus },
      { withCredentials: true }
    )

    // ✅ Update UI instantly (no refetch needed)
    setMenue((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, status: newStatus } : item
      )
    )

    setActiveItemID(null) // close dropdown
  } catch (err) {
    console.log(err)
  }
}

useEffect(() => {
    async function getPartnersByID() {
      try {
        const response = await axios.get(
          `https://digital-epicuren.onrender.com/api/food/partner/${partnerId}`,
          {},
        );
        const data = response.data.data;
        setPartner(data);
      } catch (err) {
        console.log(err);
      }
    }

    getPartnersByID();
  }, []);

   useEffect(() => {
    async function getMenue() {
      try {
        const res = await axios.get(
          `https://digital-epicuren.onrender.com/api/food/menue/${partnerId}`,
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

// in handleReel submit add a post request to the backend to add a new reel for the partner  and then close the form after successful submission make sure to include the video file in the request body and also include the description  , nameof the reel in the request body i will be doing it with the help of imageKit  and the api is ready just help for the frontend part 
const handleReelSubmit = async (e) => {
  e.preventDefault()

  // create a form data object and append the video file and description to it and then send it to the backend

  const data = new FormData()
  data.append("video", reelData.video)
  data.append("description", reelData.description)
  data.append("reelName", reelData.reelName)
  data.append("foodItemId", reelData.foodItemId)

  try {
    const response = await fetch(`https://digital-epicuren.onrender.com/api/food/addfooditemreel/${partnerId}`, {
      method: "POST",
      body: data,
      credentials: "include", 
    })
    const result = await response.json()
    console.log(" Reel Added:", result)
    setopenRellForm(false)
  } catch (error) {
    console.error(" Error:", error)
  }
}

















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




    { openForm && (
      <div className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">Add New Menu Item</h2>
          <form onSubmit={handleFormSubmit}>
            <div> 
              <label className="block text-sm font-medium text-gray-700">Dish Name</label>
              <input onChange={handleInputChange} name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black " placeholder="Enter dish name " />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea onChange={handleInputChange} name="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black" placeholder="Enter dish description"></textarea>
              </div>
              <div>


                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="flex mt-1 gap-2">
                <select onChange={handleInputChange} name="currency" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black">
                  <option className='text-gray-700  ' >USD</option>
                  <option className='text-gray-700  ' >INR</option>
                  <option className='text-gray-700  ' >EUR</option>
                </select>
                                  <input onChange={handleInputChange} name="price" type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black" placeholder="Enter price" />

                </div>
              </div>
              <div>

                {/* add a dropdown for quantity selection */}

                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex mt-1 gap-2">
                  <input onChange={handleInputChange} name="quantity" type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black" placeholder="Enter quantity" />
                  <select onChange={handleInputChange} name="quantityUnit" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black">
                    <option className='text-gray-700  ' ></option>
                    <option className='text-gray-700  ' >ml</option> 
                    <option className='text-gray-700  ' >pcs</option>
                    <option className='text-gray-700  ' >gram</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cuisine</label>
                <select onChange={handleInputChange => setActiveItemID(item._id)} name="cuisine" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black  ">
                  <option className='text-gray-700  ' >Indian</option>
                  <option className='text-gray-700  ' >Chinese</option>
                  <option className='text-gray-700  ' >Italian</option>
                  <option className='text-gray-700  ' >Mexican</option>
                  <option className='text-gray-700  ' >Continental</option>
                  <option className='text-gray-700  ' >Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input   onChange={handleFileChange} name="image" type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700" />
              </div>
              <div className="flex justify-between gap-4 mt-2">
                <button type="button" className="px-5 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors" onClick={() => setopenForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-5 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                  Add Item
                </button>
              </div>
          </form>
        </div>
      </div>
    )}

      {/* form to upload new reel */}

      { openRellForm && (
        <div className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-orange-600">Add New Food Reel</h2>
            <form onSubmit={handleReelSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reel for Food Item </label>
                <select onChange={handleReelChange} name="foodItemId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black">
                  <option value="">Select a food item</option>
                  {menue.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reel Name</label>
                <input onChange={handleReelChange} name="reelName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black" placeholder="Enter reel name"></input>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea onChange={handleReelChange} name="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black" placeholder="Enter reel description"></textarea>
              </div> 
               
              <div>
                <label className="block text-sm font-medium text-gray-700">Video</label>
                <input onChange={handleReelChange} name="video" type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700" />
              </div>
              <div className="flex justify-between gap-4 mt-2">
                <button type="button" className="px-5 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors" onClick={() => setopenRellForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-5 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                  Add Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">Partner Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{partner.restaurantName}</h1>
            <p className="text-gray-600 mt-2">Manage menu items, track sales, and monitor reel performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/partners/${partner._id}`}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              Back to Partner Page
            </Link>

                          {/* add a btn to add new reel from here  add onclick feature to open a form which accepts a video file and a description from the partner   */}

            <button onClick={() => setopenRellForm(true)} className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors">
              New listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-8 space-y-8 ">
        <div className="grid gap-6  ">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Today's Orders</p>
                {/* <p className="mt-4 text-4xl font-bold text-gray-900">{Math.floor(20 + partner.menu.length * 3)}</p> */}
                <p className="text-sm text-gray-500 mt-2">Delivered and pending</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Revenue</p>
                {/* <p className="mt-4 text-4xl font-bold text-gray-900">${(Math.floor(3 + partner.menu.length * 2) * 120).toFixed(2)}</p> */}
                <p className="text-sm text-gray-500 mt-2">Estimated today</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Menu Items</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">{menue?.length || 0}</p>
                <p className="text-sm text-gray-500 mt-2">Live dishes</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Reel Views</p>
                  {/* <p className="mt-4 text-4xl font-bold text-gray-900">{Math.floor(3000 + partner.menu.length * 450)}</p> */}
                <p className="text-sm text-gray-500 mt-2">Last 24 hours</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Menu Inventory</h2>
                  <p className="text-gray-600 mt-1">Update prices, view stock, and organize featured dishes.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
                onClick={() => setopenForm(true)}
                >
                  Add Dish
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {menue?.map((item, index) => (
                  <div key={item._id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">{item.description} ({item.quantity}{item.quantityUnit}) </p>

                      <p className="text-sm text-gray-600 mt-1">{item.currency}  {item.price}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span   onClick={() => handleInput(item._id, item.status)}
 className="rounded-full bg-white px-3 py-2 text-gray-700 shadow-sm"> 
                        
                     {activeItemID === item._id ? (
  <select
    value={tempStatus}
    onChange={(e) => handleStatusChange(e, item._id)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
  >
    <option value="low stock">Low Stock</option>
    <option value="out of stock">Out Of Stock</option>
    <option value="live">Live</option>
  </select>
) : (
  `status : ${item.status}`
)}
                      
                      </span>
                      <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <aside className="space-y-6">
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
          </aside> */}
        </div>
      </div>
    </div>
  )
}

export default PartnerDashboard
