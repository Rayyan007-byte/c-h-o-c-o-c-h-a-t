const Request = require('../models/requestModel');

const myRequest = async (req, res) => {
  
  try {
    const userId = req.user.id;
    console.log(userId);
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {myRequest}