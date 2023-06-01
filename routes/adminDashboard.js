import { Router } from 'express';
const router = Router();
import admin from "../controllers/admin-controllers.js";

/* GET /admin/dashboard page. */
router.get('/', function (req, res, next){
    res.render('admin/admin-dashboard');
})


/* GET /admin/dashboard/profile page. */
router.get('/profile', function (req, res, next){
    res.render('admin/admin-profile');
})

/* GET /admin/dashboard/stats page. */
router.get('/stats', function (req, res, next){
    res.render('admin/admin-stats');
})

/* GET /admin/dashboard/finances page. */
router.get('/finances', function (req, res, next){
    res.render('admin/admin-finances');
})

/* GET /admin/dashboard/messages page. */
router.get('/messages', function (req, res, next){
    res.render('admin/admin-messages');
})

/* GET /admin/dashboard/sellings page. */
router.get('/sellings', function (req, res, next){
    res.render('admin/admin-sellings', {title: "title"});
})

/* Post One item */
router.post('/sellings',admin.addItem);

/* GET One item using id */
router.get('/getOne/:id',admin.getItem);

/* GET More Than One item using id */
router.get('/getAll',admin.getItems);

/* UPDATE One item using id */
router.patch('/update/:id',admin.updateItem)

/* Delete One item using id */
router.delete('/delete/:id', admin.deleteItem)

/* GET /admin/dashboard/usings page. */
router.get('/usings', function (req, res, next){
    res.render('admin/admin-usings');
})

/* GET /admin/dashboard/settings page. */
router.get('/settings', function (req, res, next){
    res.render('admin/admin-settings');
})

export default router;