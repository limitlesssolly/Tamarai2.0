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

router.get('/whishlist', function(req, res, next) {
    res.render( 'user/user-whishlist', { Title: "whishlist" });
});

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
    if (req.session.user || req.session.admin) next();
    else {
        res.send('You must login to procceed');
    }
})

export default router;