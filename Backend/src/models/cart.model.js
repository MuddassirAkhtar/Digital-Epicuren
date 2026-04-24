const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({          

          userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
          },
          items: [  
                    {
                              foodItemId: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: "Menue",
                                        required: true
                              },
                              quantity: {
                                        type: Number,
                                        default: 1
                              },
                              partnerName: {
                                        type: String,
                                        required: true
                              }
                    }
          ]
});

module.exports = mongoose.model("Cart", cartSchema);

