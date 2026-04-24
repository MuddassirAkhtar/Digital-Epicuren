const userModel = require("../models/user.model");
const  partenerModel = require("../models/partener.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

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
    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered sucessfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
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
  res.clearCookie("token");
  res.status(200).json({
    message: "User LoggedOut Sucessfully",
  });
}



async function registerPartener(req, res) {
  const { ownerName, restaurantName, location , email, password } = req.body;

  const isPartenerAlreadyExist = await  partenerModel.findOne({
    email,
  });

  if (isPartenerAlreadyExist) {
    return res.status(400).json({
      message: "Partener Already Exist",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const partener = await  partenerModel.create({
    ownerName,
    restaurantName,
    location,
    email,

    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: partener._id,
      userType: partener.userType,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "partener registered sucessfully",
    partener: {
      id: partener._id,
      email: partener.email,
      userType: partener.userType,
      ownerName: partener.ownerName,
      restaurantName: partener.restaurantName,
      location: partener.location,
      
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
  res.clearCookie("token");
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
    if (
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$")
    ) {
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

    // create token with role
    const token = jwt.sign(
      { id: user._id, role },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login Successful",
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
            fullName: user.fullName ,
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
            fullName: partner.ownerName ,
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

module.exports = {
  registerUser,
  logoutUser,
  registerPartener,
  logoutPartener,
  getMe,
  login
};
