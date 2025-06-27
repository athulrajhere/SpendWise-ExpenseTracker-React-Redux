const mongoose = require("mongoose");
const IncomeSchema = require("../models/IncomeModel");
const { createInitialCategory } = require("../controllers/category");
const CustomError = require("../utils/CustomError");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connectedDB = await mongoose.connect(process.env.MONGO_URL);
    console.log("Db Connected");
  } catch (error) {
    console.error('App starting error:', err);
    process.exit(1);
  }
};

module.exports = { db };
