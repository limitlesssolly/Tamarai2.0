import { Router } from 'express';
const router = Router();
import {signins, signup} from "../controllers/user-controllers.js";

/* GET /user page. */
router.get('/', function(req, res, next) {
    res.render('user/user-sign-in', {Title: "Sign In"});
})

/* GET /user/homepage page. */
router.get('/homepage', function(req, res, next) {
    res.render('user/user-homepage', {Title: "Homepage"});
})

/* GET /user/register page. */
router.get('/register', function(req, res, next) {
    res.render('user/user-register', {Title: "Register"});
});


router.get('/homepage/checkout', function(req, res, next) {
    res.render('user/user-checkout');
})
router.get('/homepage/bag', function(req, res, next) {
    res.render('user/user-shoppingbag');
})

router.post('/',signins);

router.post('/register', signup);

export default router;