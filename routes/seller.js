import { Router } from 'express';
const router = Router();
import {signups,signins, signupValidation} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller-products');
});

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller-products');
});


router.post('/register', sellerController.signup);

module.exports = router;

router.post('/', signins);


export default router;