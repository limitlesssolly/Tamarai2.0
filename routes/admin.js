import { Router } from 'express';
const router = Router();
import { signins } from "../controllers/admin-controllers.js";

let admin = false;

router.use(function(req, res, next) {
        if (req.session.type == 'seller' || req.session.type == 'user')
            console.log(200);
        else if (req.session.type == 'admin')
            admin = true;
        next();
    })
    /* GET /admin page. */
router.get('/', function(req, res, next) {
    res.render('Admin/admin-sign-in', { errorMsg: {}, admin: admin });
});

/* POST /admin page. */
router.post('/', signins);

router.post('/getSearch', async(req, res) => {
    let payload = req.body.payload.trim();
    let search = await admin.find({ username: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
})


export default router;