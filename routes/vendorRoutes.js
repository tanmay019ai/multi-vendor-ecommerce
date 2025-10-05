const express = require('express');
const router = express.Router();
const { registerVendor, getVendors, approveVendor, rejectVendor } = require('../controllers/vendorController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Vendor submits registration
// Vendor submits registration (public, no auth)
router.post('/register', registerVendor);


// Admin gets all vendors
router.get('/', auth, role(['admin']), getVendors);

// Admin approves vendor
router.put('/:id/approve', auth, role(['admin']), approveVendor);

// Admin rejects vendor
router.put('/:id/reject', auth, role(['admin']), rejectVendor);

module.exports = router;
