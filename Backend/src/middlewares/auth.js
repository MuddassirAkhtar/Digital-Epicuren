const jwt = require("jsonwebtoken")
const partenerModel = require("../models/partener.model")

const auth = async (req, res, next) => {
  // ✅ Read from Authorization header instead of cookie
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  // ✅ Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    // ✅ Return 401 (not 500) so frontend interceptor knows to refresh
    return res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
}

// ✅ isPartner and isowner are unchanged — they don't touch the token
const isPartner = async (req, res, next) => {
  if (req.user.role !== "partner") {
    return res.status(403).json({ success: false, message: "Access denied. Partners only." });
  }
  next();
}

const isowner = async (req, res, next) => {
  try {
    const partner = await partenerModel.findById(req.params.partnerId);
    console.log("PARAMS:", req.params)
    console.log(partner)

    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    if (partner._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Access denied. Not the owner." });
    }

    next();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { auth, isPartner, isowner }