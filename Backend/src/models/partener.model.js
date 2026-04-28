const mongoose = require('mongoose');
const userModel = require('./user.model');

const partenerSchema = new mongoose.Schema({


  ownerName:{
          type:String,
          required:true,

          },
          email:{
           type:String,
           required:true,
           unique:true,
          },
          password:{
          type:String,
          },
          restaurantName:{
          type:String,
            required:true,
          },
          location:{
          type:String,
          required:true,
          },
          phoneNumber:{
            type:String,
            required:true
          },
          isEmailVerified:{
            type:Boolean,
            default:false,
          },
          isPhoneNumberVerified:{
            type:Boolean,
            default:false,
          },
          userType:{
            type:String,
            default:'partner',
          }
},
          {
                    timestamp:true,
          })

          const partenerModel = mongoose.model("partener", partenerSchema)




module.exports = partenerModel