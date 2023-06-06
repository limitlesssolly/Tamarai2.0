import express from 'express';
const router = express.Router();
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';

router.get('/', getHomepage);
router.get('/bag', getShoppingBag);

router.get('/checkout', function(req, res, next) {
    res.render('user/user-checkout', { user: (req.session.user === undefined ? "" : req.session.user) });
});
router.get('/profile', function(req, res, next) {
    res.render('user/user-profile', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/bag', function(req, res, next) {
    res.render('user/user-shoppingbag', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/whishlist', function(req, res, next) {
    res.render( 'user/user-whishlist', { Title: "whishlist" }, { user: (req.session.user === undefined ? "" : req.session.user) });
});

// router.post('user/user-whishlist',(req,res)=>{
// const   {weddingdress,designerAmitabbatchan}=req.body;
// const whishlist= {weddingdress,designerAmitabbatchan};
// console.log(whishlist);
// })

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Fe mashakel');
});

export default router;