("use strict");
const asyncHandler = require("express-async-handler");
const CategorySchema = require("../models/CatagoriesModel");
const TransactionSchema = require("../models/TransactionModel");
const CustomError = require("../utils/CustomError");

exports.addCategory = asyncHandler(async (req, res) => {
  const { title, icon, color, background, isIncome } = req.body;

  const category = CategorySchema({
    user: req.user.id,
    title,
    icon,
    color,
    background,
    isIncome,
  });

  if (!title || !icon || !color) {
    throw new CustomError("Please fill all fields", 400);
  }

  const newCategory = await category.save();
  res
    .status(200)
    .json({ data: newCategory, message: "New category added successfully" });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const catagories = await CategorySchema.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json({ data: catagories, message: "Category loaded successfully" });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, icon, color, background, isIncome } = req.body;

  if (!title || !icon || !color) {
    throw new CustomError("Please fill all fields", 400);
  }

  const category = await CategorySchema.findById(id);

  if (!category) {
    throw new CustomError("category not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (category.user.toString() !== req.user.id) {
    throw new CustomError("Unauthorized", 401);
  }
  const updatedCategory = await CategorySchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    data: updatedCategory,
    message: "Category updated successfully",
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategorySchema.findById(id);

  if (!category) {
    throw new CustomError("Category not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (category.user.toString() !== req.user.id) {
    throw new CustomError("User not authorized", 401);
  }

  const deletedCategory = await CategorySchema.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new CustomError("Category not found", 400);
  }

  try {
    await TransactionSchema.deleteMany({ category: id });

    res.status(200).json({
      id: id,
      message: "Category and associated transactions deleted successfully",
    });
  } catch (error) {
    throw new CustomError("Server Error", 500);
  }
});
