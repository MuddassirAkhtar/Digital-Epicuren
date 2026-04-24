const express = require("express");
const mongoose = require("mongoose");

const menueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  foodPartener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: { type: Number },
  cusine: {
    type: String,
    enum: ["Indian", "Chinese", "Italian", "Mexican", "Continental", "Other"],
  },
  image:{
          type: String,
          default: "",
  },
  quantityUnit: {
    type: String,
    enum: [ "pcs", "cup", "ml", "gram", "kg" , "plate"],
  },
  currency: {
    type: String,
    enum: ["INR", "USD", "EUR"],
    default: "INR",
  },
  status: {
    type: String,
    enum: ["live", "low stock", "out of stock"],
    default: "live",
  },

});



module.exports = mongoose.model("Menue", menueSchema);

