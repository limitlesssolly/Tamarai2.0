import { Router } from 'express';
const router = Router();
import Prod from '../models/productData.js';
import cats from '../models/categories.js'
import { addItem } from "../controllers/seller-controller.js";
import { getSellerProducts } from "../controllers/products-controllers.js";

import regi from "../models/tryseller.js";

/* GET /seller/dashboard page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-dashboard');
})


/* GET /seller/dashboard/add page. */
// router.get('/add', function (req, res, next) {
//     res.render('seller/seller-add');
// });

/* GET /seller/dashboard/add page. */
router.get('/add', async function(req, res, next) {
    const Cats = await cats.find();
    res.render('seller/seller-add', { Cats });
});

/* post an item */
router.post('/add', addItem);

router.get('/products', async function(req, res, next) {
    const Products = await Prod.find();
    res.render('seller/seller-products', { Products });
})

/* GET /seller/dashboard/view page. */
router.get('/view', async function(req, res, next) {
    const Products = await Prod.find();
    res.render('seller/seller-view', { Products });
})

/* Delete One item using id */
router.get('/view/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    const data = await Prod.findByIdAndDelete(id)
    console.log(`Item ${data.name} has been deleted..`)
    return res.redirect('/seller/dashboard/view');
})

/* GET /seller/dashboard/info page. */
router.get('/info', function(req, res, next) {
    res.render('seller/seller-info');
})

/* GET /seller/dashboard/profile page. */
router.get('/profile', async(req, res) => {
    const sellers = await regi.find();
    res.render('seller/seller-profile', {
        sellers
    });
});

/* GET /seller/dashboard/profile page. */
router.get('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.params.id);
    res.render('seller/seller-profile', { regs });
});


router.post('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.params.id);
    regs.username = req.body.username;
    regs.email = req.body.email;
    // regs.password = req.body.password;
    await regs.save();

    // Retrieve the updated seller data from the database
    const updatedSell = await regi.findById(req.params.id);

    // Render the "profile" view with the updated seller data
    res.render('seller/seller-profile', { regs: updatedSell });
});

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send('You must login');
    }
})

export default router;