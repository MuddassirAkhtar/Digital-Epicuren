const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

          fullName:{
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
            default:'coustomer',
          }
},
          {
                    timestamp:true,
          })

          const userModel = mongoose.model("user", userSchema)

          module.exports = userModel;

