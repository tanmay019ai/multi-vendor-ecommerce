const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  gstNumber: { type: String, required: true },
  bankDetails: {
    accountNumber: String,
    ifsc: String,
    bankName: String
  },
  contactInfo: {
    email: String,
    phone: String
  },
  businessDocuments: [{ type: String }], // file URLs
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: String,
  rejectionReason: String
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
