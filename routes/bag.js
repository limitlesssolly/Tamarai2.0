import express from 'express';
const router = express.Router();
import {getShoppingBag} from '../controllers/products-controllers.js'
import Prod from '../models/productData.js';
import products from '../models/productData.js'

let admin = false;

router.use(function (req, res, next) {
    if (req.session.type == 'seller' ||req.session.type == 'user')
    console.log(200);
    else if (req.session.type == 'admin')
      admin = true;
    next();
})

router.get('/', getShoppingBag);

router.get('/bag/checkout', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

export default router;