import express from 'express';
import { Router } from 'express';
const router = Router();

import Products from "../models/productData.js";
import { signins, signup, } from "../controllers/user-controllers.js";
import mongoose from 'mongoose';
import Users from "../models/userRegister.js";
import Product from "../models/productData.js";
import isLoggedIn from '../middlewares/isLoggedIn.js';
import previousUrl from '../middlewares/previousUrl.js';
import currentUrl from '../middlewares/currentUrl.js';
let admin = false;

router.use(function(req, res, next) {
    if (req.session.type == 'seller' || req.session.type == 'user')
        console.log(200);
    else if (req.session.type == 'admin')
        admin = true;
    next();
})

router.get('/', function(req, res, next) {
    res.render('user/user-sign-in', { errorMsg: {}, admin: admin });
});

router.get('/register', function(req, res, next) {
    res.render('user/user-register', { errorMsg: {}, admin: admin })
});

router.get('/cat/:name', async(req, res) => {
    var query = { "name": req.params.name };
    console.log(query);
    const prod = await Products.findOne();
    res.render('user/cat', { catname: query }, { prod });
});

router.post('/', signins);
router.post('/register', signup);

// for search DO NOT DELETE THIS PLEASE
// DO NOT 
// I CAN SEE YOU
router.post('/getProducts', async(req, res) => {
    let payload = req.body.payload.trim();
    console.log(payload);
    // Case insensitive (WHAT IS INSIDE THE FIND)
    let search = await Products.find({ name: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    // Limit search results to 10
    search = search.slice(0, 10);
    res.send({ payload: search });
});

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Kol haga hatb2a kwisa inshallah');
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
})

router.get("/cart", currentUrl, isLoggedIn, async(req, res) => {
    try {
        const user = await Users.findById(req.user._id).populate('cart.item')
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].item === null) {
                user.cart.splice(i, 1)
                await user.save();
            }
        }
        const data = user.cart
        res.render("user/cart", { data })
    } catch (e) { res.status(404).render('error/error', { "status": "404" }) }
    // res.send(data);

})
router.post("/user/cart/:prodId", previousUrl, isLoggedIn, async(req, res) => {
    try {
        const { prodId } = req.params;
        const userData = await Users.findById(req.user._id);
        const product = await Product.findById(prodId);
        let flag = 0;
        let cartLimit = true;
        for (user of userData.cart) {

            if (prodId == user.item) {
                user.quantity += Number(req.body.quantity);
                if (user.quantity > 5) {

                    cartLimit = false;
                }

                flag = 1;
                break;

            }
        }

        if (flag != 1) {

            obj = {
                item: product,
                quantity: Number(req.body.quantity)
            }
            userData.cart.push(obj);
            await userData.save();
            res.redirect(`/user/cart/`)
        } else {
            if (cartLimit === false) {
                req.flash('error', "You cannot add more than 5 items..")
                res.redirect(`/products/${prodId}`)
            } else {
                await userData.save();
                res.redirect(`/user/cart/`)
            }
        }

    } catch (e) {
        res.status(404).render('error/error', { "status": "404" })
    }
})
router.delete("/user/cart/:userId/:prodId", previousUrl, isLoggedIn, async(req, res) => {
    try {
        const { userId, prodId } = req.params;
        const data = await Users.findById(userId);
        try {

            data.cart.splice(data.cart.findIndex((e) => e.item == prodId), 1);

            await data.save();
            req.flash("success", "Item Deleted From Your Cart");
            res.redirect("/user/cart");
        } catch (e) {
            req.flash("error", "There was a problem deleting from the cart");
            res.redirect("/user/cart");
        }
    } catch (e) {
        console.log(e);
        res.status(404).render('error/error', { "status": "404" })
    }
})
router.get("/user/orders", currentUrl, isLoggedIn, async(req, res) => {
    try {

        const data = await Users.findById(req.user._id).populate("orders");
        await data.populate({ path: 'orders.orderList.item', model: Product }).execPopulate();
        const orders = data.orders;
        res.render("user/orders", { orders });
        // res.send(orders)
    } catch (e) {
        console.log(e);
        res.status(404).render('error/error', { "status": "404" })
    }

});
export default router;