import { Router } from 'express';
const router = Router();
import {signups,signins} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function (req, res, next){
    res.render('seller-sign-in');
})

/* GET /seller/dashboard page. */
router.get('/dashboard', function (req, res, next){
    res.render('seller/seller-dashboard');
})

/* POST /seller page. */
router.post('/', signins);

export default router;