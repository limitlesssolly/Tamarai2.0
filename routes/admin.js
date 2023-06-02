import { Router } from 'express';
// import admin from '../models/adminData.js';
const router = Router();
import {signins} from "../controllers/admin-controllers.js";


/* GET /admin page. */
router.get('/', function(req, res, next) {
    res.render('admin/admin-sign-in');
});

// /* GET /admin/users page. */
// router.get('/users', function(req, res, next) {
//     res.render('admin/admin-users', {users: 'Users'});
// });


/* POST /admin page. */
router.post('/', signins );


router.post('/getSearch', async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await admin.find({username:{$regex: new RegExp('^' + payload + '.*', 'i')}}).exec();
})

router.use((req, res, next) =>{
    if (req.session.admin) next();
    else{
        res.sendStatus(401);
    }
})

export default router;