import { Router } from 'express';
const router = Router();

router.get('/', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

router.get('/dashbaord', function (req, res, next){
    res.render('Admin/admin-dashboard');
})

export default router;