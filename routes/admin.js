import { Router } from 'express';
const router = Router();
import  collection  from './models/adminData';

router.get('/admin-sign-in', function (req, res, next){
    res.render('admin-sign-in');
})

router.get('/admin-dashboard', function (req, res, next){
    res.render('admin-dashboard');
})

router.post('/admin-sign-in', async function(req, res, next)
{
    const data = {
        username: req.body.username,
        password: req.body.password,
    }
    await collection.insertMany([data])

})
export default router;