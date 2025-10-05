const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const vendorRoutes = require('./routes/vendorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route to check server
app.get('/', (req, res) => {
  res.send('Multi-vendor eCommerce Backend is running!');
});

// Vendor routes
app.use('/vendors', vendorRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
