import express from 'express';
const router = express.Router();
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';

router.get('/', getHomepage);
router.get('/bag', getShoppingBag);

router.get('/checkout', function(req, res, next) {
    res.render('user/user-checkout');
});

router.get('/bag', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

// router.get('/whishlist', function(req, res, next) {
//     res.render( 'user/user-whishlist', { Title: "whishlist" });
// });
router.get('/whishlist', async(req, res) => {
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


// router.post('user/user-whishlist',(req,res)=>{
// const   {weddingdress,designerAmitabbatchan}=req.body;
// const whishlist= {weddingdress,designerAmitabbatchan};
// console.log(whishlist);
// })

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