import { Router } from 'express';
const router = Router();

router.get('/seller', function(req, res, next) {
    // res.send('she works!');
    res.render('seller-sign-in.ejs');
});


export default router;