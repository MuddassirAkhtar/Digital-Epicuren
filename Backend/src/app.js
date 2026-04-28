const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();



app.use(cors({
   origin: [
      "http://localhost:5173", // Local frontend
      "https://your-frontend-render-url.onrender.com" // Deployed frontend
    ],
  credentials: true,
}));
// 🔥 REQUIRED middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authroute = require('./routes/auth.routes')
app.use('/api/user', authroute)


const foodroute = require('./routes/food-partener.routes')
app.use('/api/food', foodroute)


const cartRoute = require("./routes/cart.route");
app.use("/api/cart", cartRoute);


const paymentRoute = require("./routes/payment.routes");
app.use("/api/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("hello world "); 

});


module.exports = app;
