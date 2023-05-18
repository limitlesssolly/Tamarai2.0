import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('user-sign-in');
});

router.get('/register', function(req, res, next) {
    res.render('user-register');
});

// router.get('/homepage', function(req, res, next) {
//     res.render('user-homepage');
// });


export default router;