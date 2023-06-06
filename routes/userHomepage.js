import express from 'express';
const router = express.Router();
import categories from '../models/categories.js';
import Wishlist from '../models/whishlist.js'
import products from '../models/productData.js'
import regi from "../models/userRegister.js";
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';

router.get('/', async function(req, res, next) {
    try {
        const cats = await categories.find();
        const productData = await products.find();
        res.render('user/user-homepage', { productData, cats });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/checkout', function(req, res, next) {
    res.render('user/user-checkout');
});

router.get('/profile', function(req, res, next) {
    res.render('user/user-profile');
});


// router.get('/whishlist',async function(req, res, next) {
//     const wishlist = await Wishlist.find();
//     res.render( 'user/user-whishlist', {wishlist});
// });

router.get('/add-to-wishlist/:id', async function(req, res, next) {
    const wishlisted = await products.findById(req.params.id);
    // wishlisted = {
    //   name: prod.name,
    //   brand: prod.brand,
    //   seller: prod.seller,
    //   price: prod.price,
    //   image: prod.image,
    //   count: prod.count,
    //   description: prod.description,
    //   category: prod.category,
    //   color: prod.color,
    // };
    //const JSONS = JSON.stringify(wishlisted);
    // Wishlist.setItem("wished", JSONS);
    const newWish = new Wishlist({name: wishlisted.name},
        {brand: wishlisted.brand},
        {seller: wishlisted.seller},
        {price: wishlisted.price},
        {image: wishlisted.count},
        {description: wishlisted.description},
        {category: wishlisted.category},
        {color: wishlisted.color},
        );
    await newWish.save();
    console.log('et7at');
    res.redirect('user/user-homepage');
} 
 
);

/*const myObj = {name: "John", age: 31, city: "New York"};
const myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

// Retrieving data:
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.name;*/

router.get('/whishlist', async(req, res) => {
    //let wished = Wishlist.getItem("wished");
    const wished = await Wishlist.find();
    //let wish = JSON.parse(wished.wished);
   // let wish = JSON.parse(wished);
   
    // try {
       // wish = await products.find();
        //et wishaya = JSON.parse(wish);
       //res.send(wishaya);
       //console.log(wishaya);
        //document.getElementById("user/user-whishlist").newWish = wish.name;
        //res.render('user/user-whishlist', { wish });
        // res.send(wish);
        res.render('user/user-whishlist',{wished});
    
})

// router.post("/SaveWishlist", (req, res) => {
//     const wish = new Wishlist(req.body)
//     wish.save().then( () => {
//         res.status(201).send("Wish Added to Wishlist!");
//     }).catch( (e) => {
//         res.status(400).send(e);
//     })
// })
// router.patch("/UpdateWishlist/:id", async(req, res) => {
//     try {
//         const _id = req.params.id
//         const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
//         res.send(UpdateRequest);
//     } catch(e) {
//         res.status(404).send("Couldn't update your wish :(");
//     }
// })

// router.post('user/user-whishlist',(req,res)=>{
// const   {weddingdress,designerAmitabbatchan}=req.body;
// const whishlist= {weddingdress,designerAmitabbatchan};
// console.log(whishlist);
// })

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

router.get('/profile', async(req, res) => {
    const regs = await regi.find();
    res.render('user/user-profile', {regs});
});

/* GET /seller/dashboard/profile page. */
router.get('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.params.id);
    res.render('user/user-profile', { regs });
});

router.post('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.params.id);
    regs.username = req.body.username;
    regs.email = req.body.email;
    // regs.password = req.body.password;
    await regs.save();

    // Retrieve the updated seller data from the database
    const updateduser = await regi.findById(req.params.id);

    // Render the "profile" view with the updated seller data
    res.render('user/user-profile', { regs: updateduser });
});

export default router;