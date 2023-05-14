import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Express' });
});

export default router;