import { Router } from 'express';
import Prod from '../models/productData.js';
import {signups} from "../controllers/admin-controllers.js";
const router = Router();

/* GET /admin/dashboard page. */
router.get('/', async function (req, res, next) {
    res.render('admin/admin-dashboard');
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


/* UPDATE One item using id */
// router.post('/sellings/view/update/:id', updateItem)

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

router.post('/addUser',signups); 


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