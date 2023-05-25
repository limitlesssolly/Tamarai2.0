import { Router } from 'express';
const router = Router();
import {signups,signins, signupValidation} from "../controllers/admin-controllers.js";

/* GET /admin page. */
router.get('/', function (req, res, next){
    res.render('admin-sign-in');
})

/* POST /admin page. */
router.post('/', signins );

export default router;