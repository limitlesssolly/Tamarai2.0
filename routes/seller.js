const express = require('express');
const router = express.Router();
const {
    authenticateUser
} = require('../controllers/seller-controller');
router.get('/seller/seller-sign-in', authController.getSignIn);
router.post('//seller/seller-sign-in', authController.postSignIn);

module.exports = router;

export default router;