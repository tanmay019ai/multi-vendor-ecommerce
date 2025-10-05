const Vendor = require('../models/Vendor');
const sendEmail = require('../utils/sendEmail');

// Register new vendor
exports.registerVendor = async (req, res) => {
  try {
    const { businessName, gstNumber, bankDetails, contactInfo, businessDocuments } = req.body;

   const vendor = await Vendor.create({
  userId: req.user._id,
  businessName,
  gstNumber,
  bankDetails,
  contactInfo,
  businessDocuments,
  status: 'pending'
});


    res.status(201).json({
      success: true,
      message: 'Vendor registered',
      data: { vendorId: vendor._id, status: vendor.status }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all vendors (Admin)
exports.getVendors = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};

    const vendors = await Vendor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Vendor.countDocuments(query);

    res.json({ success: true, data: { vendors, pagination: { total, page: Number(page), limit: Number(limit) } } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve vendor
exports.approveVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(id, { status: 'approved', adminNotes }, { new: true });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    // Send email
    await sendEmail(vendor.contactInfo.email, 'Vendor Approved', `<p>Your vendor application has been approved!</p>`);

    res.json({ success: true, message: 'Vendor approved', data: { vendorId: vendor._id, status: vendor.status } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reject vendor
exports.rejectVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, adminNotes } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(id, { status: 'rejected', rejectionReason: reason, adminNotes }, { new: true });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    // Send email
    await sendEmail(vendor.contactInfo.email, 'Vendor Rejected', `<p>Your vendor application has been rejected. Reason: ${reason}</p>`);

    res.json({ success: true, message: 'Vendor rejected', data: { vendorId: vendor._id, status: vendor.status, reason } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};