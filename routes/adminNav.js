import { Router } from 'express';
const router = Router();

router.get('/admin-sign-in', function (req, res, next){
    res.render('admin-sign-in');
})

router.get('/admin-dashboard', function (req, res, next){
    res.send('ayo');
})

export default router;