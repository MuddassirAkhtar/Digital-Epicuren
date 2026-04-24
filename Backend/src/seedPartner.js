const mongoose = require("mongoose");
const partenerModel = require("./models/partener.model");
const MONGO_URI = "mongodb://localhost:27017/zomato";
const menueModel = require("./models/menue.model");

// const partners = [
//   // 🍕 Pizza
//   {
//     ownerName: "Ayaan Khan",
//     restaurantName: "Stone Oven Pizza",
//     location: "Mumbai",
//     email: "ayaan.khan@pizzaoven.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Rohit Mehra",
//     restaurantName: "Cheese Burst Corner",
//     location: "Delhi",
//     email: "rohit.mehra@cheeseburst.com",
//     password: "123456"
//   },

//   // 🍔 Burger
//   {
//     ownerName: "Karan Malhotra",
//     restaurantName: "Smash Burger Co",
//     location: "Bangalore",
//     email: "karan@smashburgerco.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Aditya Verma",
//     restaurantName: "Grill House Burgers",
//     location: "Pune",
//     email: "aditya@grillhouse.com",
//     password: "123456"
//   },

//   // 🌯 Shawarma
//   {
//     ownerName: "Faisal Sheikh",
//     restaurantName: "Arabian Shawarma Hub",
//     location: "Hyderabad",
//     email: "faisal@shawarmahub.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Zubair Ali",
//     restaurantName: "Desert Wrap Shawarma",
//     location: "Kochi",
//     email: "zubair@desertwrap.com",
//     password: "123456"
//   },

//   // 🍛 Biryani
//   {
//     ownerName: "Imran Qureshi",
//     restaurantName: "Nawab Biryani House",
//     location: "Lucknow",
//     email: "imran@nawabbiryani.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Sameer Ansari",
//     restaurantName: "Dum Biryani Express",
//     location: "Hyderabad",
//     email: "sameer@dumbiryani.com",
//     password: "123456"
//   },

//   // 🍽️ General Restaurants
//   {
//     ownerName: "Priya Nair",
//     restaurantName: "Spice Garden",
//     location: "Chennai",
//     email: "priya@spicegarden.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Sneha Kapoor",
//     restaurantName: "Urban Tandoor",
//     location: "Chandigarh",
//     email: "sneha@urbantandoor.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Vikram Singh",
//     restaurantName: "Royal Thali",
//     location: "Jaipur",
//     email: "vikram@royalthali.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Ankit Jain",
//     restaurantName: "Food Junction",
//     location: "Indore",
//     email: "ankit@foodjunction.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Neha Gupta",
//     restaurantName: "Healthy Bowl",
//     location: "Noida",
//     email: "neha@healthybowl.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Rohit Das",
//     restaurantName: "Flavour Street",
//     location: "Kolkata",
//     email: "rohit@flavourstreet.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Pooja Reddy",
//     restaurantName: "South Spice Kitchen",
//     location: "Hyderabad",
//     email: "pooja@southspice.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Arjun Patel",
//     restaurantName: "Desi Tadka Dhaba",
//     location: "Ahmedabad",
//     email: "arjun@desitadka.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Farhan Ali",
//     restaurantName: "Mughlai Feast",
//     location: "Bhopal",
//     email: "farhan@mughlaifeast.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Deepak Yadav",
//     restaurantName: "Village Rasoi",
//     location: "Patna",
//     email: "deepak@villagerasoi.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Nisha Sharma",
//     restaurantName: "Green Leaf Cafe",
//     location: "Delhi",
//     email: "nisha@greenleaf.com",
//     password: "123456"
//   },
//   {
//     ownerName: "Manoj Iyer",
//     restaurantName: "Coastal Curry",
//     location: "Mangalore",
//     email: "manoj@coastalcurry.com",
//     password: "123456"
//   }
// ];






// async function seedData() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("DB Connected");

//     await partenerModel.insertMany(partners);

//     console.log("✅ 20 Partners Added Successfully");
//     process.exit();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// seedData();


// async function seedMenuItems() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("DB Connected for Menu Seeding");

//     const partners = await partenerModel.find();


//     partners.forEach((partner, index) => {
//       // pick 4 items for each partner
//       const start = (index * 4) % baseMenu.length;
//       const itemsForPartner = baseMenu.slice(start, start + 4);

//       itemsForPartner.forEach((item) => {
//         finalMenuItems.push({
//           ...item,
//           foodPartener: partner._id,
//           currency: "INR",
//           image: imageMap[item.cuisine]
//         });
//       });
//     });

//     await foodModel.insertMany(finalMenuItems);

//     console.log("✅ Menu items seeded successfully");
//     process.exit();

//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// }



const finalMenuItems = [

  // 🥘 Desi Tadka Dhaba (Gujarati / North Indian)
  {
    name: "Gujarati Thali",
    description: "Authentic Gujarati meal with dal, roti, sabzi",
    price: 250,
    quantity: 1,
    quantityUnit: "plate",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b3"
  },
  {
    name: "Paneer Butter Masala",
    description: "Rich creamy paneer curry",
    price: 220,
    quantity: 300,
    quantityUnit: "gram",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b3"
  },
  {
    name: "Butter Roti",
    description: "Soft whole wheat roti with butter",
    price: 20,
    quantity: 2,
    quantityUnit: "pcs",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b3"
  },
  {
    name: "Masala Khichdi",
    description: "Comforting rice and lentil dish",
    price: 180,
    quantity: 400,
    quantityUnit: "gram",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b3"
  },

  // 🍗 Mughlai Feast
  {
    name: "Chicken Korma",
    description: "Rich Mughlai curry with spices",
    price: 320,
    quantity: 400,
    quantityUnit: "gram",
    cuisine: "Mughlai",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b4"
  },
  {
    name: "Mutton Biryani",
    description: "Slow-cooked aromatic biryani",
    price: 350,
    quantity: 500,
    quantityUnit: "gram",
    cuisine: "Mughlai",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b4"
  },
  {
    name: "Tandoori Chicken",
    description: "Char-grilled spicy chicken",
    price: 300,
    quantity: 1,
    quantityUnit: "pcs",
    cuisine: "Mughlai",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b4"
  },
  {
    name: "Roomali Roti",
    description: "Thin soft bread",
    price: 25,
    quantity: 2,
    quantityUnit: "pcs",
    cuisine: "Mughlai",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b4"
  },

  // 🍛 Village Rasoi
  {
    name: "Dal Tadka",
    description: "Classic Indian lentils with tempering",
    price: 150,
    quantity: 300,
    quantityUnit: "gram",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b5"
  },
  {
    name: "Jeera Rice",
    description: "Rice flavored with cumin",
    price: 120,
    quantity: 300,
    quantityUnit: "gram",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b5"
  },
  {
    name: "Aloo Paratha",
    description: "Stuffed potato flatbread",
    price: 80,
    quantity: 2,
    quantityUnit: "pcs",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b5"
  },
  {
    name: "Curd Bowl",
    description: "Fresh homemade curd",
    price: 60,
    quantity: 200,
    quantityUnit: "gram",
    cuisine: "Indian",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b5"
  },

  // 🥗 Green Leaf Cafe (Healthy)
  {
    name: "Tofu Salad",
    description: "Healthy vegan protein salad",
    price: 220,
    quantity: 250,
    quantityUnit: "gram",
    cuisine: "Healthy",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b6"
  },
  {
    name: "Avocado Sandwich",
    description: "Creamy avocado with fresh veggies",
    price: 200,
    quantity: 2,
    quantityUnit: "pcs",
    cuisine: "Healthy",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b6"
  },
  {
    name: "Green Smoothie",
    description: "Spinach, apple and detox drink",
    price: 150,
    quantity: 300,
    quantityUnit: "ml",
    cuisine: "Healthy",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b6"
  },
  {
    name: "Quinoa Bowl",
    description: "High protein quinoa meal",
    price: 250,
    quantity: 300,
    quantityUnit: "gram",
    cuisine: "Healthy",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b6"
  },

  // 🐟 Coastal Curry
  {
    name: "Fish Curry",
    description: "Authentic coastal fish curry",
    price: 300,
    quantity: 400,
    quantityUnit: "gram",
    cuisine: "Seafood",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b7"
  },
  {
    name: "Prawn Fry",
    description: "Spicy fried prawns",
    price: 350,
    quantity: 250,
    quantityUnit: "gram",
    cuisine: "Seafood",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b7"
  },
  {
    name: "Neer Dosa",
    description: "Soft rice dosa from coast",
    price: 120,
    quantity: 3,
    quantityUnit: "pcs",
    cuisine: "Seafood",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b7"
  },
  {
    name: "Coconut Curry Rice",
    description: "Rice with coconut-based gravy",
    price: 180,
    quantity: 400,
    quantityUnit: "gram",
    cuisine: "Seafood",
    currency: "INR",
    foodPartener: "69e4f63604c63dff8ec102b7"
  }

];

const imageMap = {
  Pizza: "https://images.unsplash.com/photo-1601924582975-7e79f4b9b2b4",
  Burger: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  Biryani: "https://images.unsplash.com/photo-1604908177522-040fbb2c4a7c",
  Shawarma: "https://images.unsplash.com/photo-1617196038435-2c9f3c8f2d2d",
  Healthy: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  Seafood: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
};


async function seedMenuItems() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected for Menu Seeding");

    // attach images based on cuisine
    const menuWithImages = finalMenuItems.map(item => ({
      ...item,
      image: imageMap[item.cuisine] || ""
    }));

    // insert into DB
    await menueModel.insertMany(menuWithImages);

    console.log("✅ Menu items seeded successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedMenuItems();
  