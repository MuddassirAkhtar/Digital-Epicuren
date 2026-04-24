const express = require("express");
const cartController = require("../controllers/cart.controller");
const { auth } = require("../middlewares/auth");

const router = express.Router();

// add item to cart
router.post("/add", auth, cartController.addToCart);

// get cart items
router.get("/", auth, cartController.getCartItems);


// remove item from cart
router.post("/remove", auth, cartController.removeFromCart);

// decrease quantity
router.post("/decrease", auth, cartController.decreaseQuantity);

// clear cart
router.post("/clear", auth, cartController.clearCart);

module.exports = router;
