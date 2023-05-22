import { Router } from 'express';
const router = Router();

/* GET /admin/dashboard page. */
router.get('/', function (req, res, next){
    res.send('admin-dashboard.ejs');
})

export default router;