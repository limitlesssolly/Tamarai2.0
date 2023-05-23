const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/seller-controller');

router.post('/login', authenticateUser);

export default router;