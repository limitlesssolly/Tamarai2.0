import express from 'express';
import Products from "../models/productData.js";
import Categories from '../models/categories.js';
import {signins,
    signup,
    signupValidation,
    checkUN,} from "../controllers/user-controllers.js";

const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('user/user-sign-in', { Title: "User Sign In" });
});

// router.get('/register', function (req, res, next) {
//     res.render('user/user-register', { Title: "User Register" });
// });

router.get('/cat/:name', async (req, res) => {
    // const prod = await Products.find();
    // let catsOnly = {};
    // for (let i = 0; i < prod.length; i++) {
    //     if (prod[i].name === ) {
    //         catsOnly.append(prod[i]);
    //     }
    // }
    // res.render('user/cat', {catsOnly});
    var query = { "name": req.params.name };
    const prod = await Products.findOne();
    res.render('user/cat', {catname: query}, {prod});
    // Categories.find(query)
    //     .then(result => {
    //         console.log(result);
    //         // res.render('user/cat', {result});
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
  });

router.post('/checkUN', checkUN);

router.post('/', signins);

let admin = false;

router.use(function (req, res, next) {
  if (req.session.type)
    return res.redirect('/');
  else if (req.session.type == 'admin')
    admin = true;
  next();
});

router.get('/register', function (req, res, next) {
  res.render('user/user-register', { errorMsg: {}, admin: admin })
});

router.post('/register',signup);

// router.post('/register', User.signup);

router.post('/getProducts', async (req, res) => {
    let payload = req.body.payload.trim();
    console.log(payload);
    // Case insensitive (WHAT IS INSIDE THE FIND)
    let search = await Products.find({ name: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    // Limit search results to 10
    search = search.slice(0, 10);
    res.send({ payload: search });
});

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Kol haga hatb2a kwisa inshallah');
});

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send('You must login');
    }
})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

export default router;