const { history } = require("../models/history"); 


const getAllHistory = async (req, res) => {
  try {
  
    const userId = req.user;
    console.log(userId);
    
    const histories = await history.find({ userId: userId })
      .populate('testId', 'title') 
      .populate('userId', 'name email'); 

    res.status(200).json(histories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllHistory,
};
