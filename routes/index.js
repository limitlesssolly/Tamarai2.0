import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/admin-sign-in', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

router.get('/user-sign-in.ejs', function (req, res, next){
    res.render('User/user-sign-in');
})

router.get('/user-register.ejs', function (req, res, next){
    res.render('User/user-register');
})
router.get('/seller', function (req, res, next){
    res.render('seller/seller-sign-in');
})
export default router;