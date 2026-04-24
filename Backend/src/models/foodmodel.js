const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    reelName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    likeCounts: {
      type: Number,
      default: 0,
    },
   
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

    foodPartener: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "partener",
      required: true,
    },
    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    }
  },
  { timestamps: true }
);

const foodModel = mongoose.model("food", foodSchema);
module.exports = foodModel;
