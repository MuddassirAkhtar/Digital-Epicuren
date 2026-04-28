const userModel = require("../models/user.model");
const partenerModel = require("../models/partener.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpService = require("../services/otp.service");
const crypto = require("crypto");
const sendResetEmail = require("../services/email.service");

async function registerUser(req, res) {
  const { fullName, email, password, phoneNumber } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user Already Exist",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    phoneNumber,
    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "user registered sucessfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    },
  });
}
// async function loginUser(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid email or password" });
//   }

//   const isPasswordValid =  bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(400).json({ message: "Invalid email or password" });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

//   res.cookie("token", token);

//   res.status(200).json({
//     message: "User Logged In Successfully",
//     user: {
//       fullName: user.fullName,
//       email: user.email,
//     },
//   });
// }

async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({
    message: "User LoggedOut Sucessfully",
  });
}

async function registerPartener(req, res) {
  const { ownerName, restaurantName, location, email, password, phoneNumber } =
    req.body;

  const isPartenerAlreadyExist = await partenerModel.findOne({
    email,
  });

  if (isPartenerAlreadyExist) {
    return res.status(400).json({
      message: "Partener Already Exist",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const partener = await partenerModel.create({
    ownerName,
    restaurantName,
    location,
    email,
    phoneNumber,

    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: partener._id,
      userType: partener.userType,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "partener registered sucessfully",
    partener: {
      id: partener._id,
      email: partener.email,
      userType: partener.userType,
      ownerName: partener.ownerName,
      restaurantName: partener.restaurantName,
      location: partener.location,
      phonNumber: partner.phoneNumber,
    },
  });
}
// async function loginPartener(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const partener = await  partenerModel.findOne({ email });

//   if (!partener) {
//     return res.status(400).json({ message: "Invalid email or password" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, partener.password);

//   if (!isPasswordValid) {
//     return res.status(400).json({ message: "Invalid email or password" });
//   }

//   const token = jwt.sign({ id: partener._id }, process.env.SECRET_KEY);

//   res.cookie("token", token);

//   res.status(200).json({
//     message: "User Logged In Successfully",
//     partener: {
//       fullName: partener.fullName,
//       email: partener.email,
//     },
//   });
// }

async function logoutPartener(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({
    message: "User LoggedOut Sucessfully",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check in both collections
    let user = await userModel.findOne({ email });
    let role = "user";

    if (!user) {
      user = await partenerModel.findOne({ email });
      role = "partner";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let isPasswordValid = false;

    // 🔍 Check password type
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      // hashed password
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // plain password (dev case)
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔄 Upgrade plain → hashed AFTER successful login
    if (
      !user.password.startsWith("$2a$") &&
      !user.password.startsWith("$2b$")
    ) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
    }

    // 📱 Send OTP to user's mobile number
    try {
      if (user.phoneNumber) {
        await otpService.createVerification(user.phoneNumber);
      }
    } catch (otpErr) {
      console.log("OTP sending failed:", otpErr);
      // Continue with login even if OTP sending fails
    }

    // create token with role
    const token = jwt.sign({ id: user._id, role }, process.env.SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful. OTP sent to registered mobile number.",
      user: {
        id: user._id,
        fullName: user.fullName || user.ownerName,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getMe(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const userId = decoded.id;

      let user = await userModel.findById(userId).select("-password");

      if (user) {
        return res.status(200).json({
          authenticated: true,

          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: "user",
          },
        });
      }

      let partner = await partenerModel.findById(userId).select("-password");

      if (partner) {
        return res.status(200).json({
          authenticated: true,

          user: {
            id: partner._id,
            fullName: partner.ownerName,
            email: partner.email,
            role: "partner",
          },
        });
      }

      return res.status(404).json({
        message: "User not found",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
}

async function sendOtp(req, res) {
  const { email } = req.body;

  let role = null;
  let partener = null;

  const user = await userModel.findOne({ email });
  role = "user";

  if (!user) {
    partener = await partenerModel.findOne({ email });
    role = "partner";
  }

  console.log(user.phoneNumber);

  try {
    role == "user"
      ? otpService.createVerification(user.phoneNumber)
      : otpService.createVerification(partener.phoneNumber);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "failed to send otp " });
  }

  res.status(200).json({ mesage: "otp sent Sucessfully" });
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  console.log(email, otp);

  let partner = null;
  let role = null;

  const user = await userModel.findOne({ email });

  if (user) {
    role = "user";
  } else {
    partner = await partenerModel.findOne({ email });

    if (partner) {
      role = "partner";
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  }

  try {
    const verification =
      role === "user"
        ? await otpService.createVerificationCheck(otp, user.phoneNumber)
        : await otpService.createVerificationCheck(otp, partner.phoneNumber);

    if (verification.status === "approved") {
      if (role === "user") {
        user.isPhoneNumberVerified = true;
        await user.save();
      } else {
        partner.isPhoneNumberVerified = true;
        await partner.save();
      }

      return res.status(200).json({
        message: "OTP verified successfully",
        status: verification.status,
      });
    } else {
      return res.status(400).json({
        message: "Invalid OTP",
        status: verification.status,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable to verify OTP",
    });
  }
}

async function checkVerificationStatus(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(200).json({
        role: "user",
        isPhoneNumberVerified: user.isPhoneNumberVerified,
      });
    }

    let partner = await partenerModel.findOne({ email });

    if (partner) {
      return res.status(200).json({
        role: "partner",
        isPhoneNumberVerified: partner.isPhoneNumberVerified,
      });
    }

    return res.status(404).json({
      message: "User not found",
    });
  } catch (err) {
    console.error("Verification status check failed:", err);

    return res.status(500).json({
      message: "Server error while checking verification status",
    });
  }
}

async function forgetPassword(req, res) {
  const { email } = req.body;

  let partener = null;
  let role = null;

  const user = await userModel.findOne({ email });

  if (user) {
    role = "user";
  } else {
    partener = await partenerModel.findOne({ email });

    if (partener) {
      role = "partener";
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  }

  try {
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    if (role === "user") {
      user.resetToken = hashedToken;
      user.expire = Date.now() + 15 * 60 * 1000;
      await user.save();

      const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      await sendResetEmail(user.email, resetLink);
    }

    if (role === "partener") {
      partener.resetToken = hashedToken;
      partener.expire = Date.now() + 15 * 60 * 1000;
      await partener.save();

      const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      await sendResetEmail(partener.email, resetLink);
    }

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  let partener = null;
  let role = null;

  const user = await userModel.findOne({
    resetToken: hashedToken,
    expire: { $gt: Date.now() },
  });

  if (user) {
    role = "user";
  } else {
    partener = await partenerModel.findOne({
      resetToken: hashedToken,
      expire: { $gt: Date.now() },
    });

    if (partener) {
      role = "partener";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (role === "user") {
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.expire = undefined;
      await user.save();
    }

    if (role === "partener") {
      partener.password = hashedPassword;
      partener.resetToken = undefined;
      partener.expire = undefined;
      await partener.save();
    }

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  registerUser,
  logoutUser,
  registerPartener,
  logoutPartener,
  getMe,
  login,
  sendOtp,
  verifyOtp,
  checkVerificationStatus,
  forgetPassword,
  resetPassword,
};
