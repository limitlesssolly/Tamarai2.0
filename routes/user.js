import { Router } from 'express';
const router = Router();
import { signups, signins, signupValidation } from "../controllers/user-controllers.js";

/* GET /user page. */
router.get('/', function(req, res, next) {
    res.render('user/user-sign-in');
});

// User homepage
router.get('/home', function(req, res, next) {
    res.render('user/user-homepage');
})

/* GET /user/register page. */
router.get('/register', function(req, res, next) {
    res.render('user/user-register');
});

/* GET /user/homepage page. */
router.get('/homepage', function(req, res, next) {
    res.render('user/user-homepage');
});

router.get('/seller/info', function(req, res, next) {
    res.render('seller/seller-info');
})
router.post('/', signins);

export default router;