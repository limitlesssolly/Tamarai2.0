import { Router } from 'express';
const router = Router();
import  Admin  from '../models/adminData.js';

router.get('/', function (req, res, next){
    res.render('admin-sign-in', {sol : new Admin()});
})

router.get('/admin-dashboard', function (req, res, next){
    res.render('admin-dashboard');
})

router.post('/admin-dashboard', async function(req, res, next)
{
    const admin = new Admin({
        username: req.body.un,
        password: req.body.pw,
    })
    try
    {
        const newAdmin = await admin.save();
        // res.redirect(`admin/$newAdmin.username`)
        res.redirect('admin-dashboard');
    }
    catch
    {
        res.render('admin-sign-in',{
            admin: admin,
            errorMessage :'error signing up'
        })
    }
})
export default router;