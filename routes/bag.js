import express from 'express';
const router = express.Router();
import Prod from '../models/productData.js';
import products from '../models/productData.js'

router.get('/', getShoppingBag);

router.get('/bag', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

export default router;