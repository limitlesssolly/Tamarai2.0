import { Router } from 'express';
import admin from '../models/adminData.js';
import Prod from '../models/productData.js';
const router = Router();
import {
    addItem,
    getItem,
    getItems,
    updateItem,
    deleteItem
}
    from "../controllers/admin-controllers.js";
import { Model } from 'mongoose';

/* GET /admin/dashboard page. */
router.get('/', function (req, res, next) {
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
router.get('/sellings', function (req, res, next) {
    res.render('admin/admin-sellings', {Prod});
})

/* GET /admin/dashboard/usings page. */
router.get('/usings', function (req, res, next) {
    res.render('admin/admin-usings');
})

/* GET /admin/dashboard/settings page. */
router.get('/settings/', function (req, res, next) {
    res.render('admin/admin-settings');
});

/* GET /admin/dashboard/sellings/item page. */
router.get('/sellings/:_id', getItem);

/* Post One item */
router.post('/sellings', addItem);

 

// router.get('/usings',getItem);
// router.post('/usings',addItem);

 


 

 



 
/* GET More Than One item using id */
router.get('/getAll', getItems);

/* UPDATE One item using id */
router.patch('/update/:id', updateItem)

/* Delete One item using id */
router.delete('/delete/:id', deleteItem)

router.use((req, res, next) => {
    if (req.session.admin) next();
    else {
        res.send('You are not an admin');
    }
})

export default router;