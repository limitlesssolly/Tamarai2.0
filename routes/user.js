import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    // res.send('she works!');
    res.render('user-sign-in.ejs');
});


export default router;