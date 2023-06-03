import { Router } from 'express';
const router = Router();
// import seller from '../models/sellerRegister.js';
import {signup,signins} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

/* GET /seller/register page. */
router.get('/register', function(req, res, next) {
    res.render('seller/seller-register');
})



router.post('/', signins);

router.post('/register', signup);

export default router;