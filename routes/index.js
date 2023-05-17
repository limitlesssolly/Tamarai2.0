import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/index.ejs', function (req, res, next){
    res.render('index');
})

router.get('/admin-sign-in', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

export default router;