import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/sign-in', function(req,res,next){
    res.render('./User/user-sign-in');
});

router.get('/sign-up', function(req,res,next){
    res.render('./User/user-register');
});

router.get('/admin', function (req, res, next){
    res.render('./Admin/admin-sign-in');
})

router.get('/seller', function (req, res, next){
    res.render('./Seller/seller-sign-in');
})

router.get('/seller-sign-up', function (req, res, next){
    res.render('./Seller/seller-register');
})

export default router;