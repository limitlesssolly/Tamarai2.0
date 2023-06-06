import express from 'express';
const router = express.Router();
import categories from '../models/categories.js';
import Wishlist from '../models/whishlist.js'
import products from '../models/productData.js'
import regi from "../models/userRegister.js";
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';

router.get('/', async function(req, res, next){
    try{
        const cats = await categories.find();
        const productData = await products.find();
        res.render('user/user-homepage', {productData, cats});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
router.get('/bag', getShoppingBag);

router.get('/checkout', function(req, res, next) {
    res.render('user/user-checkout');
});

router.get('/profile', function(req, res, next) {
    res.render('user/user-profile');
});

router.get('/bag', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

router.get('/whishlist',async function(req, res, next) {
    const wishlist = await Wishlist.find();
    res.render( 'user/user-whishlist', {wishlist});
});

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
    const JSONS = JSON.stringify(wishlisted);
    // Wishlist.setItem("wished", JSONS);
    const newWish = new Wishlist({Wish: JSONS,});
    await newWish.save();
    console.log('et7at');
    res.render('user/user-homepage');
});

/*const myObj = {name: "John", age: 31, city: "New York"};
const myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

// Retrieving data:
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.name;*/

router.get('/whishlist', async(req, res) => {
    // let wished = Wishlist.getItem("wished");
    const wished = await Wishlist.find();
    let wish = JSON.parse(wished);
    try {
        wish = await products.find();
        let wishaya = JSON.parse(wish);
        res.send(wishaya);
        res.render('user/user-whishlist',{wishlist})
    } catch(e) {
        res.send(e);
    }
})

router.post("/SaveWishlist", (req, res) => {
    const wish = new Wishlist(req.body)
    wish.save().then( () => {
        res.status(201).send("Wish Added to Wishlist!");
    }).catch( (e) => {
        res.status(400).send(e);
    })
})
router.patch("/UpdateWishlist/:id", async(req, res) => {
    try {
        const _id = req.params.id
        const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
        res.send(UpdateRequest);
    } catch(e) {
        res.status(404).send("Couldn't update your wish :(");
    }
})

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



router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send('You must login');
    }
})
export default router;