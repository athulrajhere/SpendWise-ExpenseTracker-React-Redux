const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/UserModel");
const CustomError = require("../utils/CustomError");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await UserSchema.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new CustomError("User not found", 401);
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'MongooseError' || error.message.includes('disconnected')) {
        throw new CustomError("The database is temporarily unreachable. Please try again later.", 503);
      }
      
      if (error.name === 'TokenExpiredError') {
        throw new CustomError("Access token expired", 401);
      }
      
      if (error.name === 'JsonWebTokenError') {
        throw new CustomError("Invalid token", 401);
      }
      
      throw new CustomError("Not Authorized", 401);
    }
  } else {
    throw new CustomError("Not authorized, no token", 401);
  }
});

module.exports = { protect };