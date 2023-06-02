import { Router } from 'express';
const router = Router();
import {
    addItem,
    getItem,
    getItems, 
    updateItem,
    deleteItem} 
from "../controllers/admin-controllers.js";
import Products from '../models/productData.js';

/* GET /admin/dashboard page. */
router.get('/', function (req, res, next){
    res.render('admin/admin-dashboard');
})


/* GET /admin/dashboard/stats page. */
router.get('/stats', function (req, res, next){
    // const {item} = req.session;
    // if(!item)
    // {
    //     res.send('you have no item session');
    // }
    // else{
    //     res.send(item);
        res.render('admin/admin-stats');
    // }
})

// router.post('/stats/item', function (req, res, next){
//     const {name, price} = req.body;
//     const statsItem = {name,price};
//     // res.send(req.sessionID);
//     const {item} = req.session;
//     if (item)
//     {
//         req.session.items.push(statsItem);
//     }else{
//         req.session.item =
//         {
//             items:[statsItem],
//         }
//     }
//     res.sendStatus(201);
// })

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
    // res.cookie('visited', true, {
    //     maxAge: 90000,
    // })
    res.render('admin/admin-sellings');
})

/* GET /admin/dashboard/usings page. */
router.get('/usings', function (req, res, next){
    // res.cookie('visitedtoo', true, {
    //     maxAge: 90000,
    // })
    res.render('admin/admin-usings');
})

/* GET /admin/dashboard/settings page. */
router.get('/settings', function (req, res, next){
    res.render('admin/admin-settings');
})

/* GET /admin/dashboard/sellings/item page. */
router.get('/sellings/:_id',getItem);

/* Post One item */
router.post('/sellings',addItem);

/* GET More Than One item using id */
router.get('/getAll',getItems);

/* UPDATE One item using id */
router.patch('/update/:id',updateItem)

/* Delete One item using id */
router.delete('/delete/:id',deleteItem)

router.use((req, res, next) =>{
    if (req.session.admin) next();
    else{
        res.sendStatus(401);
    }
})

export default router;