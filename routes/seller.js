import { Router } from 'express';
const router = Router();
import seller from '../models/sellerRegister.js';
import {signup,signins, addItem} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

/* GET /seller/register page. */
router.get('/register', function(req, res, next) {
    res.render('seller/seller-register');
})

/* GET /seller/dashboard page. */
router.get('/dashboard', function(req, res, next) {
    res.render('seller/seller-dashboard');
})


/* GET /seller/add page. */
router.get('/add', function(req, res, next) {
    res.render('seller/seller-add');
});

/* POST /seller/dashboard /add page. */
router.post('/dashboard/add',addItem);

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller/seller-products');
});


/* GET /seller/info page. */
router.get('/info', function(req, res, next) {
    res.render('seller/seller-info');
})


/* GET /seller/profile page. */
router.get('/profile', function(req, res, next) {
    res.render('seller/seller-profile');
})


// router.get('/profile/:id', async (req, res) => {
//     console.log('bydkhol hna');
//     try {
//       const sellers = await seller.findById(req.params.id);
//       if (!sellers)return res.status(404).render('error.ejs', { message: "Seller not found" });
//       else return res.render('seller/seller-profile', {seller});
//     } catch (err) {
//       console.log(err);
//       return res.status(500).render('error.ejs');
//     }
//   });

router.post('/', signins);

router.post('/register', signup);

export default router;