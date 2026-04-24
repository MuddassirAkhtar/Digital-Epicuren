const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 orderedItems: [
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }
],
  amount: {
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);