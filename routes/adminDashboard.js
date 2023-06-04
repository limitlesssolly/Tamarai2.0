import { Router } from 'express';
import Prod from '../models/productData.js';
import kitty from '../models/categories.js'
import {signups, signupstoo, signupstre, addCategory} from "../controllers/admin-controllers.js";
const router = Router();

/* GET /admin/dashboard page. */
router.get('/', async function (req, res, next) {
    const cats = await kitty.find();
    res.render('admin/admin-dashboard', {cats});
})

router.post('/addcategory',addCategory);

/* Delete One category using id */
router.get('/category/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const data = await kitty.findByIdAndDelete(id)
    console.log(`Category ${data.name} has been deleted..`)
    return res.redirect('/admin/dashboard');
})

/* GET /admin/dashboard/stats page. */
router.get('/stats', function (req, res, next) {
    res.render('admin/admin-stats');
})

/* GET /admin/dashboard/messages page. */
router.get('/messages', function (req, res, next) {
    res.render('admin/admin-messages');
})

/* GET /admin/dashboard/sellings page. */
router.get('/sellings', async function (req, res, next) {
    const Products = await Prod.find();
    res.render('admin/admin-sellings', {Products});
})

/* GET /admin/dashboard/sellings/view page. */
router.get('/sellings/view/:id', async function (req, res, next) {
    const Products = await Prod.findById(req.params.id);
    res.render('admin/admin-sellings-view', {Products});
})

/* Delete One item using id */
router.get('/sellings/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const data = await Prod.findByIdAndDelete(id)
    console.log(`Item ${data.name} has been deleted..`)
    return res.redirect('/admin/dashboard/sellings');
})

/* GET /admin/dashboard/usings page. */
router.get('/usings', function (req, res, next) {
    res.render('admin/admin-usings');
})

/* GET /admin/dashboard/usings/user page. */
router.get('/usings/user', function (req, res, next) {
    res.render('admin/admin-add-user');
})

/* GET /admin/dashboard/usings/admin page. */
router.get('/usings/admin', function (req, res, next) {
    res.render('admin/admin-add-admin');
})

/* GET /admin/dashboard/usings/seller page. */
router.get('/usings/seller', function (req, res, next) {
    res.render('admin/admin-add-seller');
})

router.post('/addUser',signups); 
router.post('/addSeller',signupstoo); 
router.post('/addAdmin',signupstre); 


/* GET /admin/dashboard/settings page. */
router.get('/settings/', function (req, res, next) {
    res.render('admin/admin-settings');
});

router.use((req, res, next) => {
    if (req.session.admin) next();
    else {
        res.send('You are not an admin');
    }
})

export default router;