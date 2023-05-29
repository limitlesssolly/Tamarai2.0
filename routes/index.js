import { Router } from 'express';
const router = Router();

/* GET / page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET /admin page. */
router.get('/admin', function(req, res, next) {
    res.render('admin/admin-sign-in');
})

/* GET /user page. */
router.get('/user', function(req, res, next) {
    res.render('user/user-sign-in');
})

/* GET /user/register page. */
router.get('/user/register', function(req, res, next) {
    res.render('user/user-register');
})


/* GET /seller page. */
router.get('/seller/', function(req, res, next) {
    res.render('seller/seller-sign-in');
})

/* GET /seller/register page. */
router.get('/seller/register', function(req, res, next) {
    res.render('seller/seller-register');
})
router.get('/seller/info', function(req, res, next) {
    res.render('seller/seller-info');
})
router.get('/seller/products', function(req, res, next) {
    res.render('seller/seller-products');
})
router.get('/user/homepage', function(req, res, next) {
    res.render('user/user-homepage');
})
export default router;