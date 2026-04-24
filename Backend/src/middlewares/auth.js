const jwt = require("jsonwebtoken")
const  partenerModel = require ("../models/partener.model") 

const auth = async ( req , res , next ) => {
          const authToken = req.cookies.token
          
          if(!authToken){
                    return res.status(401).json({success: false, message:"token missing"})
          }

          try{
                    const decoded = jwt.verify(authToken,process.env.SECRET_KEY)
                    req.user = decoded
                    next()
          }catch(err){
                    return res.status(500).json({success:false, message:"failed to authenticate"})
          }
}

const isPartner= async (req, res, next) => {

          if (req.user.role !== "partner") {
                    return res.status(403).json({ success: false, message: "Access denied. Partners only." });
          }

          next();
}

const isowner = async (req, res, next) => {

try{
          const partner = await partenerModel.findById(req.params.partnerId);
          console.log("PARAMS:", req.params)

          console.log(partner)

if(!partner){
          return res.status(404).json({ success: false, message: "Partner not found" });
}

if(partner._id.toString() !== req.user.id){
          return res.status(403).json({ success: false, message: "Access denied. Not the owner." });


}
next();

}catch(err){
          console.log(err)
          return res.status(500).json({ success: false, message: "Server error" });
}
}
module.exports = { auth, isPartner, isowner } 