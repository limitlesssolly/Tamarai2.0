import { Router } from 'express';
const router = Router();
import {signups,signins} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function (req, res, next){
    res.render('seller-sign-in');
})


/* POST /seller page. */
router.post('/', signins);

export default router;