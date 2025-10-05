const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id || decoded._id }; // ✅ ensures req.user._id exists
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
