const Razorpay = require("razorpay");
const orderModel = require("../models/order.model");
const menueModel = require("../models/menue.model");
const PaymentModel = require("../models/payment.model");
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function checkOut(req, res) {
  try {
    const { orderedItems } = req.body;

    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // ✅ Step 1: Extract IDs
    const ids = orderedItems.map(item => item.menuId);

    const menuItems = await menueModel.find({
      _id: { $in: ids },
    });

    // ✅ Step 2: Validate
    if (menuItems.length !== ids.length) {
      return res.status(404).json({
        message: "Some items not found",
      });
    }

    // ✅ Step 3: Calculate total
    let totalAmount = 0;

    orderedItems.forEach(orderItem => {
      const menu = menuItems.find(
        m => m._id.toString() === orderItem.menuId
      );

      totalAmount += menu.price * orderItem.quantity;
    });

    // ✅ Step 4: Save order in DB
    const newOrder = await orderModel.create({
      orderedItems,
      amount: {
        price: totalAmount,
        currency: "INR",
      },
    });

    // ✅ Step 5: Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // ⚠️ convert to paise
      currency: "INR",
    });

    // ✅ Step 6: Save payment entry
    await PaymentModel.create({
      orderId: razorpayOrder.id,
      price: {
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      status: "pending",
    });

    // ✅ Step 7: Send response to frontend
    res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder._id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
    });

  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



async function verify(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    // ✅ Step 1: Verify signature
    const isValid = validatePaymentVerification(
      {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
      },
      signature,
      secret
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Step 2: Find payment in DB
    const payment = await PaymentModel.findOne({
      orderId: razorpayOrderId,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // ✅ Step 3: Update payment
    payment.paymentId = razorpayPaymentId;
    payment.signature = signature;
    payment.status = "completed";

    await payment.save();

    // ✅ Step 4: Success response
    res.json({ status: "success" });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
}

module.exports = { checkOut , verify};