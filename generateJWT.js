const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
  _id: "64f0f4a2abc1234567890ef", // test user ID
  role: "vendor"                  // test role: "vendor" or "admin"
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

console.log("Your test JWT token:", token);
