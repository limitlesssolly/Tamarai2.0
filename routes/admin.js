import { Router } from 'express';
import admin from '../models/adminData.js';
const router = Router();
import {signins} 
from "../controllers/admin-controllers.js";


/* GET /admin page. */
router.get('/', function(req, res, next) {
    res.render('admin/admin-sign-in');
})

/* POST /admin page. */
router.post('/', signins );

// router.post('/getSearch', async (req, res) => {
//     let payload = req.body.payload.trim();
//     let search = await admin.find({username:{$regex: new RegExp('^' + payload + '.*', 'i')}}).exec();
// })

export default router;