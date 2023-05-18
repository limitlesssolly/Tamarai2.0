import { Router } from 'express';
const router = Router();
import  Admin  from '../models/adminData.js';

/* GET /admin page. */
router.get('/', function (req, res, next){
    res.render('admin-sign-in');
})

/* GET /admin/dashboard page. */
router.get('/dashboard', function (req, res, next){
    res.render('admin/admin-dashboard.ejs');
})

router.post('/', async function(req, res, next)
{
    const admin = new Admin({
        username: req.body.name,
        password: req.body.pass,
    })
    admin.save()
    .then((result)=>
    {
        res.render('admin/admin-dashboard.ejs')
    })
    .catch(err=>{
        console.log(err);
    })
    // try
    // {
    //     const newAdmin = await admin.save();
    //     // res.redirect(`admin/$newAdmin.username`)
    //     res.redirect('admin-dashboard');
    // }
    // catch
    // {
    //     res.render('admin-sign-in',{
    //         admin: admin,
    //         errorMessage :'error signing up'
    //     })
    // }
})
export default router;