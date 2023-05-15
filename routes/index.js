import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/admin', function (req, res, next){
    res.render('./Admin/admin-sign-in');
})
// router.get('/user-sign-in.ejs', function(req,res,next){
//     res.render('user-sign-in');
// });

// router.get('/sign-up', function(req,res,next){
//     res.render('user-register');
// });


// router.get('/seller', function (req, res, next){
//     res.render('seller-sign-in');
// })

// router.get('/seller-sign-up', function (req, res, next){
//     res.render('seller-register');
// })

export default router;