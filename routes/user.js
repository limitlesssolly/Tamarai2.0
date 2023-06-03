import express from 'express';
import { signins, signup } from "../controllers/user-controllers.js";
import { getHomepage } from '../controllers/products-controllers.js';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user/user-sign-in', { Title: "Sign In" });
});

router.get('/homepage', getHomepage);

router.get('/register', function(req, res, next) {
    res.render('user/user-register', { Title: "Register" });
});

router.get('/homepage/checkout', function(req, res, next) {
    res.render('user/user-checkout');
});

router.get('/homepage/bag', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

router.post('/', signins);

router.post('/register', signup);

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal server error');
});

export default router;