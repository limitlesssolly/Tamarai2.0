import { Router } from 'express';
const router = Router();

import { getSignIn, postSignIn } from "../controllers/seller-controller.js";

/* GET /admin page. */
router.get('/', function (req, res, next){
    res.render('seller-sign-in');
})

/* POST /admin page. */
router.post('/', postSignIn);

export default router;