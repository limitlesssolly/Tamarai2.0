import { Router } from 'express';
const router = Router();


/* GET /seller page. */
router.get('/', (req, res) => {
    res.render('seller-sign-in', { seller: new Seller() });
});

/* GET /seller/register page. */
router.get('/register', (req, res) => {
    res.render('seller-register');
});

router.post('/', async(req, res) => {
    const seller = new Seller({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const newSeller = await seller.save();
        res.redirect('/seller/dashboard');
    } catch (err) {
        res.render('seller-sign-in', {
            seller: seller,
            errorMessage: 'Error signing up',
        });
    }
});

router.get('/dashboard', (req, res) => {
    res.render('seller/seller-dashboard');
});

/* GET /seller/seller-info page. */

router.get('/seller/info', function(req, res, next) {
    res.render('seller/seller-info');
})
router.get('/seller/products', function(req, res, next) {
    res.render('seller/seller-products');
})
router.get('/', (req, res) => {
    const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    res.render('index', { imageUrl });
});



export default router;