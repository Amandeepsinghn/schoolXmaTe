const { history } = require("../models/history"); 


const getAllHistory = async (req, res) => {
  try {
    const histories = await history.find()
      .populate('userId', 'name email')
      .populate('testId', 'title');   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllHistory,
};
