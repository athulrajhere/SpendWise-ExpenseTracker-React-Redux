const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (amount < 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    const newIncome = await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndUpdate(id, req.body, { new: true })
    .then((income) => {
      res.status(200).json({ message: "Income updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
