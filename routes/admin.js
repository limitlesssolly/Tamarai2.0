import { Router } from 'express';
const router = Router();
// import admin from '../models/adminData.js';
import {signins} from "../controllers/admin-controllers.js";

/* GET /admin page. */
router.get('/', function (req, res, next) {
    res.render('admin/admin-sign-in');
});

/* POST /admin page. */
router.post('/', signins);


router.post('/getSearch', async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await admin.find({ username: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
})

router.use((req, res, next) => {
    if (req.session.admin) next();
    else {
        res.send('You are not an admin');
    }
})

export default router;