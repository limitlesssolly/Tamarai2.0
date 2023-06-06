import express from 'express';
import Products from "../models/productData.js";
import { signins, signup } from "../controllers/user-controllers.js";

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user/user-sign-in', { Title: "User Sign In" });
});

router.get('/register', function(req, res, next) {
    res.render('user/user-register', { Title: "User Register" });
});

router.get("/homepage/whishlist", async(req, res) => {
    try {
        const Wishes = await Wishlist.find();
        res.send(Wishes);
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
    res.status(500).send('Internal server error');
});

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send('You must login to procceed');
    }
})

export default router;