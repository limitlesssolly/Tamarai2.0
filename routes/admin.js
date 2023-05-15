import { Router } from 'express';
const router = Router();
import  collection  from 'mongoose';
// const connection = collection;

router.get('/', function (req, res, next){
    res.render('Admin/admin-sign-in');
})

router.get('/admin-dashboard.ejs', function (req, res, next){
    res.render('Admin/admin-dashboard');
})

router.post('/admin-dashboard.ejs', async function(req, res, next)
{
    const data = {
        username: req.body.username,
        password: req.body.password,
    }

    await collection.insertMany([data])

})
export default router;