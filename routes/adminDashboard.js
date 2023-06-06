import { Router } from 'express';
import Prod from '../models/productData.js';
import kitty from '../models/categories.js';
import Users from '../models/userRegister.js';
import {signups, signupstoo, signupstre, addCategory} from "../controllers/admin-controllers.js";
// import { deleteUser } from '../controllers/admin-controllers.js';
const router = Router();

/* GET /admin/dashboard page. */
router.get('/', async function (req, res, next) {
    const cats = await kitty.find();
    res.render('admin/admin-dashboard', {cats}, { user: (req.session.user === undefined ? "" : req.session.user) });
})

router.post('/addcategory',addCategory);

/* Delete One category using id */
router.get('/category/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const data = await kitty.findByIdAndDelete(id)
    console.log(`Category ${data.name} has been deleted..`)
    return res.redirect('/admin/dashboard', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/stats page. */
router.get('/stats', function (req, res, next) {
    res.render('admin/admin-stats', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/messages page. */
router.get('/messages', function (req, res, next) {
    res.render('admin/admin-messages', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/sellings page. */
router.get('/sellings', async function (req, res, next) {
    const Products = await Prod.find();
    res.render('admin/admin-sellings', {Products}, { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/sellings/view page. */
router.get('/sellings/view/:id', async function (req, res, next) {
    const Products = await Prod.findById(req.params.id);
    res.render('admin/admin-sellings-view', {Products}, { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* Delete One item using id */
router.get('/sellings/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const data = await Prod.findByIdAndDelete(id)
    console.log(`Item ${data.name} has been deleted..`)
    return res.redirect('/admin/dashboard/sellings', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/usings page. */
router.get('/usings', function (req, res, next) {
    const users = Users.find({}).then((users) => {
        res.render('admin/admin-usings', {users: users}, { user: (req.session.user === undefined ? "" : req.session.user) });
    }).catch((err) => {
        next(err);
    });
})

/* GET /admin/dashboard/usings/user page. */
router.get('/usings/user', function (req, res, next) {
    res.render('admin/admin-add-user', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/usings/admin page. */
router.get('/usings/admin', function (req, res, next) {
    res.render('admin/admin-add-admin', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET /admin/dashboard/usings/seller page. */
router.get('/usings/seller', function (req, res, next) {
    res.render('admin/admin-add-seller', { user: (req.session.user === undefined ? "" : req.session.user) });
})

router.post('/addUser',signups); 
router.post('/addSeller',signupstoo); 
router.post('/addAdmin',signupstre); 
// router.post('/deleteUSer',deleteUser);

/* GET /admin/dashboard/settings page. */
router.get('/settings/', function (req, res, next) {
    res.render('admin/admin-settings', { user: (req.session.user === undefined ? "" : req.session.user) });
});


export default router;