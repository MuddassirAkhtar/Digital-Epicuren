const mongoose = require('mongoose');

function connectDB () {
          mongoose.connect(process.env.MONGOOSE_URI)

          .then(()=>{
                    console.log("MongoDb Connected")
          }).catch((err)=>{
               console.log(err)
          })
}

module.exports = connectDB;