import { Router } from 'express';
const router = Router();

router.get('/admin-sign-in.ejs', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

router.get('/admin-dashboard.ejs', function (req, res, next){
    res.render('Admin/admin-dashboard');
})

export default router;