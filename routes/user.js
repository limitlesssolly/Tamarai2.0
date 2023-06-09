import express from 'express';
import Products from "../models/productData.js";
import categories from '../models/categories.js';
import { signins, signup, } from "../controllers/user-controllers.js";

const router = express.Router();

let admin = false;

router.use(function(req, res, next) {
    if (req.session.type == 'seller' || req.session.type == 'user')
        console.log(200);
    else if (req.session.type == 'admin')
        admin = true;
    next();
})

router.get('/', function(req, res, next) {
    res.render('User/user-sign-in', { errorMsg: {}, admin: admin });
});

router.get('/register', function(req, res, next) {
    res.render('User/user-register', { errorMsg: {}, admin: admin })
});

// Get /user/cat/:id 
router.get('/cat/:id', async(req, res) => {
    const cats = await categories.findById(req.params.id);
    const productData = await Products.find();
    res.render('User/cat', { cats, productData });
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

export default router;