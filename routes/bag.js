// import express from 'express';

// const router = express.Router();
// import { getShoppingBag } from '../controllers/products-controllers.js'
// import Product from '../models/productData.js'

// let admin = false;

// router.use(function(req, res, next) {
//     if (req.session.type == 'seller' || req.session.type == 'user')
//         console.log(200);
//     else if (req.session.type == 'admin')
//         admin = true;
//     next();
// })

// router.get('/', getShoppingBag);
// router.get('/', function(req, res, next) {
//     res.render('user/user-shoppingbag');
// })

// router.get('/bag/checkout', function(req, res, next) {
//     res.render('user/user-shoppingbag');
// });

// router.get('/add/:product', function(req, res) {
//     console.log("Product ID:", req.params.product);
//     var _id = req.params.product;
//     Product.findOne({ _id: _id }, function(err, p) {
//         if (err) {
//             console.log(err);
//             // Handle the error appropriately
//             // For example, you can send an error response to the client
//             return res.status(500).send('Internal Server Error');
//         }

//         if (typeof req.session.bag == "undefined") {
//             req.session.bag = [];
//             req.session.bag.push({
//                 title: _id, // Fix typo from tittle to title
//                 qty: 1,
//                 price: parseFloat(p.price).toFixed(2),
//                 image: '/product_images/' + p._id + '/' + p.image
//             });
//         } else {
//             var bag = req.session.bag;
//             var newItem = true;
//             for (var i = 0; i < bag.length; i++) {
//                 if (bag[i].title == _id) { // Fix typo from tittle to title
//                     bag[i].qty++;
//                     newItem = false;
//                     break;
//                 }
//             }
//             if (newItem) {
//                 bag.push({
//                     title: _id, // Fix typo from tittle to title
//                     qty: 1,
//                     price: parseFloat(p.price).toFixed(2),
//                     image: '/product_images/' + p._id + '/' + p.image
//                 });
//             }
//         }
//         console.log(req.session.bag);
//         req.flash('success', 'Product added!');
//         res.redirect('back');
//     });
// });
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/userRegister.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import previousUrl from '../middlewares/previousUrl.js';
import currentUrl from '../middlewares/currentUrl.js';

const router = express.Router();

router.get('/', currentUrl, isLoggedIn, async(req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.item');
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].item === null) {
                user.cart.splice(i, 1);
                await user.save();
            }
        }
        const data = user.cart;
        res.render('user/bag', { data });
    } catch (error) {
        res.status(404).render('error/error', { status: '404' });
    }
});

router.post('/:prodId', previousUrl, isLoggedIn, async(req, res) => {
    try {
        const { prodId } = req.params;
        const userData = await User.findById(req.user._id);
        const product = await ProductsData.findById(prodId);
        let flag = 0;
        let cartLimit = true;
        for (const user of userData.cart) {
            if (prodId == user.item) {
                user.quantity += Number(req.body.quantity);
                if (user.quantity > 5) {
                    cartLimit = false;
                }
                flag = 1;
                break;
            }
        }

        if (flag !== 1) {
            const obj = {
                item: product,
                quantity: Number(req.body.quantity)
            };
            userData.cart.push(obj);
            await userData.save();
            res.redirect('/user/cart/');
        } else {
            if (cartLimit === false) {
                req.flash('error', 'You cannot add more than 5 items..');
                res.redirect(`/products/${prodId}`);
            } else {
                await userData.save();
                res.redirect('/user/cart/');
            }
        }
    } catch (error) {
        res.status(404).render('error/error', { status: '404' });
    }
});

router.delete('/user/cart/:userId/:prodId', previousUrl, isLoggedIn, async(req, res) => {
    try {
        const { userId, prodId } = req.params;
        const data = await User.findById(userId);
        try {
            data.cart.splice(data.cart.findIndex((e) => e.item == prodId), 1);
            await data.save();
            req.flash('success', 'Item Deleted From Your Cart');
            res.redirect('/user/cart');
        } catch (error) {
            req.flash('error', 'There was a problem deleting from the cart');
            res.redirect('/user/cart');
        }
    } catch (error) {
        console.log(error);
        res.status(404).render('error/error', { status: '404' });
    }
});

router.get('/user/orders', currentUrl, isLoggedIn, async(req, res) => {
    try {
        const data = await User.findById(req.user._id).populate('orders');
        await data.populate({ path: 'orders.orderList.item', model: ProductsData }).execPopulate();
        const orders = data.orders;
        res.render('user/orders', { orders });
    } catch (error) {
        console.log(error);
        res.status(404).render('error/error', { status: '404' });
    }
});
export default router;