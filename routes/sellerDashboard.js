import { Router } from 'express';
const router = Router();
import Prod from '../models/productData.js';
import {addItem} from "../controllers/seller-controller.js";

/* GET /seller/dashboard page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-dashboard');
})


/* GET /seller/dashboard/add page. */
router.get('/add', function(req, res, next) {
    res.render('seller/seller-add');
});

/* GET /seller/dashboard/view page. */
router.get('/add', function(req, res, next) {
    res.render('seller/seller-add');
});

/* post an item */
router.post('/add',addItem);

/* GET /seller/dashboard/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller/seller-products');
});


/* GET /seller/dashboard/view page. */
router.get('/view',async function(req, res, next) {
    const Products = await Prod.find();
    res.render('seller/seller-view' , {Products});
})

/* Delete One item using id */
router.get('/view/delete/:id', async function (req, res, next) {
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
router.get('/profile', function(req, res, next) {
    res.render('seller/seller-profile');
})

export default router;