const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to authenticate JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token == null)
    return res.status(401).json({ msg: "Not authorized, please log in" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });

    req.user = decodedUser;
    next();
  });
};

// Middleware for role
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      if (req.user.role === "staff") {
        return res.status(403).json({ msg: "Access denied you are not admin" });
      }
    }
    next();
  };
};
