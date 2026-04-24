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

