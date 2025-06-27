const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/UserModel");
const CategorySchema = require("../models/CatagoriesModel");
const AccountSchema = require("../models/AccountModel");
const ProfileSchema = require("../models/ProfileModel");
const { CATEGORY_INITIAL_OPTIONS, ACCOUNT_INITIAL_OPTIONS } = require("../libs/constants");
const CustomError = require("../utils/CustomError");
const { validatePassword } = require("../utils/passwordValidation");

const createCategoryOptions = async (userId) => {
  const newCategory = CATEGORY_INITIAL_OPTIONS.map((obj) => ({
    ...obj,
    user: userId,
  }));
  const options = { ordered: true };
  const result = await CategorySchema.insertMany(newCategory, options);
};
const createAccountOptions = async (userId) => {
  const newaccount = ACCOUNT_INITIAL_OPTIONS.map((obj) => ({
    ...obj,
    user: userId,
  }));
  const options = { ordered: true };
  const result = await AccountSchema.insertMany(newaccount, options);
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Please enter a valid email address");
    }

    if (name.trim().length < 2) {
      res.status(400);
      throw new Error("Name must be at least 2 characters long");
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      res.status(400);
      throw new Error(passwordValidation.errors.join(". "));
    }

    const userExists = await UserSchema.findOne({ email: email.toLowerCase() });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = UserSchema({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const newUser = await user.save();
    const profile = await ProfileSchema.create({ user: user._id });

    await profile.save();
    
    createCategoryOptions(newUser._id);
    createAccountOptions(newUser._id);

    if (newUser) {
      const token = generateToken(newUser._id);
      const refreshToken = generateRefreshToken(newUser._id);
      
      await storeRefreshToken(newUser._id, refreshToken);
      
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/'
      });
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
      });
      
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await UserSchema.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    await storeRefreshToken(user._id, refreshToken);
    
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/'
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    throw new CustomError("Invalid credentials", 400);
  }
});

const getUser = asyncHandler(async (req, res) => {

  res.status(200).json(req.user);
});

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

const storeRefreshToken = async (userId, token) => {
  await UserSchema.updateOne({ _id: userId }, { refreshToken: token });
};

const refreshToken = asyncHandler(async (req, res) => {

  const refreshTokenValue = req.cookies?.refreshToken;
  
  if (!refreshTokenValue) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  
  try {
    const decoded = jwt.verify(refreshTokenValue, process.env.REFRESH_SECRET);
    
    const user = await UserSchema.findById(decoded.id);
    if (!user || user.refreshToken !== refreshTokenValue) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    
    const newAccessToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    await storeRefreshToken(user._id, newRefreshToken);
    
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/'
    });
    
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 1000,// 7 days
      path: '/'
    });
    
    res.json({
      message: "Tokens refreshed successfully",
      token: newAccessToken
    });
    
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({ message: "Refresh token expired" });
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw new CustomError("Token expired or invalid", 403);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  await UserSchema.updateOne({ _id: userId }, { refreshToken: null });
  
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  
  res.status(204).send();
});

module.exports = { 
  registerUser, 
  loginUser, 
  getUser, 
  refreshToken, 
  logoutUser
};
