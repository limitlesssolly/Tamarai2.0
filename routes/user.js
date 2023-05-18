import { Router } from 'express';
const router = Router();

/* GET /user page. */
router.get('/', function(req, res, next) {
    res.render('user-sign-in');
});

/* GET /user/register page. */
router.get('/register', function(req, res, next) {
    res.render('user-register');
});

/* GET /user/homepage page. */
// router.get('/homepage', function(req, res, next) {
//     res.render('user-homepage');
// });


export default router;