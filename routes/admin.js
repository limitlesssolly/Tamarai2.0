import { Router } from 'express';
const router = Router();

router.get('/', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

router.get('/admin-dashboard.ejs', function (req, res, next){
    res.render('Admin/admin-dashboard');
})

router.post('/admin-dashboard.ejs', function(req, res, next)
{
    
})
export default router;