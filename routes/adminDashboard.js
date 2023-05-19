import { Router } from 'express';
const router = Router();

/* GET /admin/dashboard page. */
router.get('/', function (req, res, next){
    res.render('admin/admin-dashboard.ejs');
})

export default router;