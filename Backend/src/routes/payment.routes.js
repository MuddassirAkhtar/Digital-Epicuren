const express = require("express");
const auth = require("../middlewares/auth")
const router = express.Router();

const checkoutController = require ("../controllers/checkout.Controller")


router.post("/checkout",   checkoutController.checkOut  )

router.post("/verify", checkoutController.verify )




module.exports = router;
