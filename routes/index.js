import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    // res.send('she works!');
    res.render('index.ejs');
});

router.get('/sign-in', function(req,res,next){
    res.render('user-sign-in.ejs');
});

router.get('/sign-up', function(req,res,next){
    res.render('user-register.ejs');
});
export default router;