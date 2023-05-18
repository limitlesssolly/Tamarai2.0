import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/admin-sign-in', function (req, res, next){
    res.render('admin/admin-sign-in');
})

router.get('/user-sign-in.ejs', function (req, res, next){
    res.render('user/user-sign-in');
})

router.get('/user-register', function (req, res, next){
    res.render('user/user-register');
})
router.get('/seller-sign-in', function (req, res, next){
router.get('/seller-sign-in', function (req, res, next){
    res.render('seller/seller-sign-in');
})
export default router;