import { Router } from 'express';
const router = Router();
import {signup,signins} from "../controllers/seller-controller.js";

let admin = false;

router.use(function (req, res, next) {if (req.session.type == 'admin')admin = true;next();});

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in', { errorMsg: {}, admin: admin });
});

/* GET /seller/register page. */
router.get('/register', function (req, res, next) {
    res.render('seller/seller-register', { errorMsg: {}, admin: admin })
});

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/');
})

router.post('/', signins);
router.post('/register',signup);


export default router;