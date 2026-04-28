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

    const ids = orderedItems.map(item => item.menuId);

    const menuItems = await menueModel.find({
      _id: { $in: ids },
    });

    if (menuItems.length !== ids.length) {
      return res.status(404).json({
        message: "Some items not found",
      });
    }

    let totalAmount = 0;

    orderedItems.forEach(orderItem => {
      const menu = menuItems.find(
        m => m._id.toString() === orderItem.menuId
      );

      totalAmount += menu.price * orderItem.quantity;
    });

    const newOrder = await orderModel.create({
      orderedItems,
      amount: {
        price: totalAmount,
        currency: "INR",
      },
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, 
      currency: "INR",
    });

    await PaymentModel.create({
      orderId: razorpayOrder.id,
      price: {
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      status: "pending",
    });

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

    const payment = await PaymentModel.findOne({
      orderId: razorpayOrderId,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.paymentId = razorpayPaymentId;
    payment.signature = signature;
    payment.status = "completed";

    await payment.save();

    res.json({ status: "success" });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
}

module.exports = { checkOut , verify};