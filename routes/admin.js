import { Router } from 'express';
const router = Router();

router.get('/', function (req, res, next){
    res.render('admin-sign-in.ejs');
})

router.get('/admin-dashboard', function (req, res, next){
    res.render('admin-dashboard');
})

router.post('/admin-sign-in', async function(req, res, next)
{
    res.send('testin');
})
export default router;