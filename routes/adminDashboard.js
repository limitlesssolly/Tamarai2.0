import { Router } from 'express';
import Prod from '../models/productData.js';
import kitty from '../models/categories.js';
import Users from '../models/userRegister.js';

import numusers from '../models/noOfuser.js'
import {signups, signupstoo, signupstre, addCategory} from "../controllers/admin-controllers.js";
import {noOfusers}from "../controllers/admin-controllers.js";
// import { deleteUser } from '../controllers/admin-controllers.js';
 

const router = Router();
import MongoClient from "mongodb";
let admin = false;

router.use(function (req, res, next) {
    if (req.session.type == 'seller' ||req.session.type == 'user')
      return res.send('You are not an admin');
    else if (req.session.type == 'admin')
      admin = true;
    next();
})

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

// try{
//     //const collection = await user.find();
//     const collection = connect.collection("user");
//     collection.countDocuments().then((count_documents) => {
//         console.log(count_documents);
//       }).catch((err) => {
//         console.log(err.Message);
//       })
//       const btngan = new kitty({usersno: count_documents});
//       await btngan.save();
//       console.log('category lots of users isa');
//     res.redirect('/admin/dashboard/stats');

// router.get('/stats', function (req, res, next) {
//     const url = 'mongodb://localhost:27017/explorer/test'
//           console.log("hi");
//     const dbname="User"
//           MongoClient.connect(url).then((client) => {
//         console.log("hi");
//         const connect = client.db(User);
//         console.log("hi");
//         const collection = connect.collection("users"); 
//         console.log("hi");
//         collection.countDocuments().then((count_documents) => {
//                     // console.log(count_documents);
//         const col =   Users.findById(req.params.id);
//         const btngan = new numusers({ usersno:col.count_documents });
//                console.log("btngan");
//                  btngan.save();
//              })
//             //  .catch((err) => {
//             //         console.log(err.Message);
//             //        }) 
       
//         console.log(' lots of users isa');
//         res.render('admin/admin-stats', { btngan });
// })
 


router.get('/stats', function (req, res, next) {
    const url = 'mongodb://localhost:127.0.0.1/explorer/test/users/find';
    const dbname = 'User';
    conole.log("hi");
    MongoClient.connect(url).then((client) => {
    conole.log("hello");
      const connect = client.db(dbname);
      const collection = connect.collection('users');
      
      collection.countDocuments().then((count_documents) => {
        const numuserss = new numusers({ usersno: count_documents });
        numuserss.save().then(() => {
            console.log("hi");
          console.log(`Saved ${count_documents} users`);
          
          // Render the page after the data has been saved
          numusers.find().then((results) => {
            const btngan = results[0];
            res.render('admin/admin-stats', { btngan });
          }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        }).catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
      }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    }).catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  });


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
    const users = Users.find({}).then((users) => {
        res.render('admin/admin-usings', {users: users});
    }).catch((err) => {
        next(err);
    });
})

/* GET /admin/dashboard/usings/user page. */
router.get('/usings/user', function (req, res, next) {
    res.render('admin/admin-add-user', { errorMsg: {}, admin: admin });
})

/* GET /admin/dashboard/usings/admin page. */
router.get('/usings/admin', function (req, res, next) {
    res.render('admin/admin-add-admin', { errorMsg: {}, admin: admin });
})

/* GET /admin/dashboard/usings/seller page. */
router.get('/usings/seller', function (req, res, next) {
    res.render('admin/admin-add-seller', { errorMsg: {}, admin: admin });
})

router.post('/addUser',signups); 
router.post('/addSeller',signupstoo); 
router.post('/addAdmin',signupstre); 
router.post('/noOFusers',noOfusers)
// router.post('/deleteUSer',deleteUser);

/* GET /admin/dashboard/settings page. */
router.get('/settings/', function (req, res, next) {
    res.render('admin/admin-settings');
});

router.get('/usings/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    const data = await Users.findByIdAndDelete(id)
    console.log(`user ${data.username} has been deleted..`)
    return res.redirect('/admin/dashboard/usings');
})
 
export default router;