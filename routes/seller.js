import { Router } from 'express';
const router = Router();
import {signup,signins, signupValidation} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller-products');
});

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller-products');
});


router.post('/', signins);

export default router;