const asyncHandler = require("express-async-handler");
const Profile = require("../models/ProfileModel");
const CustomError = require("../utils/CustomError");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    throw new CustomError("Profile not found", 404);
  }

  res.status(200).json(profile);
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!profile) {
    throw new CustomError("Profile not found", 404);
  }

  await profile.save();

  res.status(200).json(profile);
});

module.exports = {
  getProfile,
  updateProfile,
};
