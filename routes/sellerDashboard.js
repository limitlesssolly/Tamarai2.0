import {Router} from 'express';
const router = Router();
import Prod from '../models/productData.js';
import cats from '../models/categories.js'
import {addItem} from "../controllers/seller-controller.js";
import regi from "../models/tryseller.js";

/* GET /seller/dashboard page. */
router.get('/', function (req, res, next) {
    res.render('seller/seller-dashboard', { user: (req.session.user === undefined ? "" : req.session.user) });
})


/* GET /seller/dashboard/add page. */
// router.get('/add', function (req, res, next) {
//     res.render('seller/seller-add');
// });

/* GET /seller/dashboard/add page. */
router.get('/add',async function (req, res, next) {
    const Cats = await cats.find();
    res.render('seller/seller-add', {Cats}, { user: (req.session.user === undefined ? "" : req.session.user) });
});

/* post an item */
router.post('/add', addItem);

/* GET /seller/dashboard/products page. */
router.get('/products', function (req, res, next) {
    res.render('seller/seller-products', { user: (req.session.user === undefined ? "" : req.session.user) });
});


/* GET /seller/dashboard/view page. */
router.get('/view', async function (req, res, next) {
    const Products = await Prod.find();
    res.render('seller/seller-view', { Products }, { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* Delete One item using id */
router.get('/view/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const data = await Prod.findByIdAndDelete(id)
    console.log(`Item ${data.name} has been deleted..`)
    return res.redirect('/seller/dashboard/view', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /seller/dashboard/info page. */
router.get('/info', function (req, res, next) {
    res.render('seller/seller-info', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /seller/dashboard/profile page. */
router.get('/profile', async (req, res) => {
    const sellers = await regi.find();
    res.render('seller/seller-profile', {
        sellers
    }, { user: (req.session.user === undefined ? "" : req.session.user) });
});

/* GET /seller/dashboard/profile page. */
 router.get('/profile/:id', async (req, res) => {
    const regs = await regi.findById(req.params.id);
    res.render('seller/seller-profile', {regs}, { user: (req.session.user === undefined ? "" : req.session.user) });
 });


router.post('/profile/:id', async (req, res) => {
    const regs = await regi.findById(req.params.id);
    regs.username = req.body.username;
    regs.email = req.body.email;
    // regs.password = req.body.password;
    await regs.save();

    // Retrieve the updated seller data from the database
    const updatedSell = await regi.findById(req.params.id);

    // Render the "profile" view with the updated seller data
    res.render('seller/seller-profile', { regs: updatedSell }, { user: (req.session.user === undefined ? "" : req.session.user) });
});

export default router;