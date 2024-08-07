const jwt = require("jsonwebtoken");
const user = require("../modals/UserModel");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to authenticate JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token == null)
    return res.status(401).json({ msg: "Not authorized, please log in" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });

    req.user = user;
    next();
  });
};

// Middleware for role
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    // if (!req.user) {
    //   return res.status(401).json({ msg: "Not authorized, please log in" });
    // }

    if (!role.includes(req.user.role)) {
      if (req.user.role === "staff") {
        return res.status(403).json({ msg: "Access denied you are not admin" });
      }
    }
    next();
  };
};
