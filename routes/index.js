import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/admin', function (req, res, next){
    res.render('admin/admin-sign-in');
})

router.get('/user', function (req, res, next){
    res.render('user/user-sign-in');
})

router.get('/user/register', function (req, res, next){
    res.render('user/user-register');
})

router.get('/seller/', function (req, res, next){
    res.render('seller/seller-sign-in');
})

router.get('/seller/register', function (req, res, next){
    res.render('seller/seller-register');
})

export default router;