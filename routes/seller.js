import { Router } from 'express';
const router = Router();
import {signups,signins, signupValidation} from "../controllers/user-controllers.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

// seller homepage
router.get('/home', function(req, res, next) {
    res.render('seller/seller-products');
})

/* GET /user/register page. */
router.get('/register', function(req, res, next) {
    res.render('seller/seller-register');
});

// /* GET /user/homepage page. */
// router.get('/homepage', function(req, res, next) {
//     res.render('user/user-homepage');
// });

router.post('/', signins);

export default router;