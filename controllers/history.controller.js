const mongoose = require('mongoose');
const test = require('../models/test');

const getTests = async (req, res) => {
  try {
    const userId = typeof req.user === 'object' ? req.user.id : req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = {
      userId: new mongoose.Types.ObjectId(userId),
      title: { $regex: search, $options: 'i' } 

    };

    const total = await test.countDocuments(query);

    const tests = await test.find(query)
      .select('title createdAt') // Only return title and date
      .sort({ createdAt: -1 })        // Latest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: tests
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTests
};
