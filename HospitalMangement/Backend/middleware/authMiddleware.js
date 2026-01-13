const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ===================== PROTECT ROUTES ===================== */
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
     
      console.log("hi good");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

/* ===================== ADMIN ONLY ===================== */
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
   

    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
 

//==============doctor only
exports.doctorOnly = (req, res, next) => {
  if (req.user && req.user.role === "doctor") {
    next(); // allowed
  } else {
    res.status(403).json({ message: "Doctor access only" });
  }
};


//====patient only
exports.patientOnly = (req, res, next) => {
  if (req.user.role === "patient") next();
  else res.status(403).json({ message: "Patient access only" });
};
