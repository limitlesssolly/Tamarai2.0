import { Router } from 'express';
const router = Router();
import {signups,signins, signupValidation} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/products', function(req, res, next) {
    res.send("yes");
});


router.post('/', signins);

export default router;