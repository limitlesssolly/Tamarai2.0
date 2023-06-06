import express from 'express';
const router = express.Router();
import { getShoppingBag } from '../controllers/products-controllers.js'
import Product from '../models/productData.js'

let admin = false;

router.use(function(req, res, next) {
    if (req.session.type == 'seller' || req.session.type == 'user')
        console.log(200);
    else if (req.session.type == 'admin')
        admin = true;
    next();
})

router.get('/', getShoppingBag);

router.get('/bag/checkout', function(req, res, next) {
    res.render('user/user-shoppingbag');
});
router.get('/add/:product', function(req, res) {
    var _id = req.params.product;
    Product.findOne({ _id: _id }, function(err, p) {
        if (err) {}
        console.log(err);
        if (typeof req.session.bag == "undefined") {
            req.session.bag = [];
            req.session.bag.push({
                tittle: _id,
                qty: 1,
                price: 1,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images/' + p._id + '/' + p.image
            });
        } else {
            var bag = req.session.bag;
            var newItem = true;
            for (var i = 0; i < bag.length; i++) {
                if (bag[i].tittle == _id) {
                    bag[i].qty++;
                    newItem = false;
                    break;
                }
            }
            if (newItem) {
                bag.push({
                    tittle: _id,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p._id + '/' + p.image
                });
            }
        }
        console.log(req.session.bag);
        req.flash('success', 'Product added!');
        res.redirect('back');
    });
});
export default router;