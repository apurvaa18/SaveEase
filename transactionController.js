const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  try {
    const newTransaction = new Transaction({
      user: req.user,
      title,
      amount,
      category,
      type,
    });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
