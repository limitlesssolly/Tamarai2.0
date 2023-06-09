import { Router } from 'express';
import Prod from '../models/productData.js';
import kitty from '../models/categories.js';
import Users from '../models/userRegister.js';
import sells from '../models/tryseller.js';
import { signups, signupstoo, signupstre, addCategory } from "../controllers/admin-controllers.js";
import dotenv from "dotenv";
const router = Router();

let admin = false;
dotenv.config();
router.use(function(req, res, next) {
    if (req.session.type == 'seller' || req.session.type == 'user')
        return res.send('You are not an admin');
    else if (req.session.type == 'admin')
        admin = true;
    next();
})

/* GET /admin/dashboard page. */
router.get('/', async function(req, res, next) {
    const cats = await kitty.find();
    const uss = await Users.find()
    const sel = await sells.find()
    let ay7aga = uss.length;
    let ay7agatoo = sel.length;

    const yarab = await Prod.find();
    let revenue = 0;
    for (let i = 0; i < yarab.length; i++) {
        revenue += yarab[i].price;
    }
    let real_revenue = revenue * 0.01;

    res.render('Admin/admin-dashboard', { ay7aga, ay7agatoo, real_revenue, cats });
})

router.post('/addcategory', addCategory);

/* Delete One category using id */
router.get('/category/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    const data = await kitty.findByIdAndDelete(id)
    console.log(`Category ${data.name} has been deleted..`)
    return res.redirect('/Admin/dashboard');
})

/* GET /admin/dashboard/messages page. */
router.get('/messages', function(req, res, next) {
    res.render('Admin/admin-messages');
})

/* GET /admin/dashboard/sellings page. */
router.get('/sellings', async function(req, res, next) {
    const Products = await Prod.find();
    res.render('Admin/admin-sellings', { Products });
})

/* GET /admin/dashboard/sellings/view page. */
router.get('/sellings/view/:id', async function(req, res, next) {
    const Products = await Prod.findById(req.params.id);
    res.render('Admin/admin-sellings-view', { Products });
})

/* Delete One item using id */
router.get('/sellings/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    const data = await Prod.findByIdAndDelete(id)
    console.log(`Item ${data.name} has been deleted..`)
    return res.redirect('/Admin/dashboard/sellings');
})

/* GET /admin/dashboard/usings page. */
router.get('/usings', function(req, res, next) {
    const users = Users.find({}).then((users) => {
        res.render('Admin/admin-usings', { users: users });
    }).catch((err) => {
        next(err);
    });
})

/* GET /admin/dashboard/usings/user page. */
router.get('/usings/user', function(req, res, next) {
    res.render('Admin/admin-add-user', { errorMsg: {}, admin: admin });
})

/* GET /admin/dashboard/usings/admin page. */
router.get('/usings/admin', function(req, res, next) {
    res.render('Admin/admin-add-admin', { errorMsg: {}, admin: admin });
})

/* GET /admin/dashboard/usings/seller page. */
router.get('/usings/seller', function(req, res, next) {
    res.render('Admin/admin-add-seller', { errorMsg: {}, admin: admin });
})

router.post('/addUser', signups);
router.post('/addSeller', signupstoo);
router.post('/addAdmin', signupstre);

/* GET /admin/dashboard/settings page. */
router.get('/settings/', function(req, res, next) {
    res.render('Admin/admin-settings');
});

router.get('/usings/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    const data = await Users.findByIdAndDelete(id)
    console.log(`user ${data.username} has been deleted..`)
    return res.redirect('/Admin/dashboard/usings');
})

export default router;