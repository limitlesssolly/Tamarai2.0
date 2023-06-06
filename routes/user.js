import express from 'express';
import Products from "../models/productData.js";
import categories from '../models/categories.js';
import { signins, signup } from "../controllers/user-controllers.js";

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user/user-sign-in', { Title: "User Sign In" });
});

router.get('/register', function(req, res, next) {
    res.render('user/user-register', { Title: "User Register" });
});

app.get('/cat/:id', (req, res) => {
    var query = { "_id": req.params.id };
    // Employees.find(query)
    //   .then(result => {
    //     res.render('emp', { emp: result[0], user: (req.session.user === undefined ? "" : req.session.user) });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });

// router.get('/nav',async function(req,res,next){
//     const cats = await categories.find();
//     res.render('partials/usernav', {cats})
// })

router.post('/', signins);
router.post('/register', signup);

router.post('/getProducts', async (req, res) => {
    let payload = req.body.payload.trim();
    console.log(payload);
    // Case insensitive (WHAT IS INSIDE THE FIND)
    let search = await Products.find({ name: {$regex: new RegExp('^' + payload + '.*','i')} }).exec();
    // Limit search results to 10
    search = search.slice(0, 10);
    res.send({payload: search});
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

export default router;