import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    // res.send('she works!');
    res.render('index.ejs');
});

export default router;