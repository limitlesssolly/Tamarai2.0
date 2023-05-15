import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index.ejs');
});

router.get('/sign-in', function(req,res,next){
    res.render('user-sign-in.ejs');
});

router.get('/sign-up', function(req,res,next){
    res.render('user-register.ejs');
});

router.get('/admin', function (req, res, next){
    res.render('admin-sign-in.ejs');
})

router.get('/seller', function (req, res, next){
    res.render('seller-sign-in.ejs');
})

router.get('/seller-sign-up', function (req, res, next){
    res.render('seller-register.ejs');
})

export default router;