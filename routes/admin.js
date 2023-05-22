import { Router } from 'express';
const router = Router();
import admin from '../models/adminData.js';

/* GET /admin page. */
router.get('/', function (req, res, next){
    res.render('admin-sign-in');
})

/* POST /admin page. */
router.post('/', async function(req, res, next)
{
    var un = req.body.name;
    var pw = req.body.pass;

    const admins = await admin.find({});
    // console.log(admins)
    var i;
    for (i = 0; i< admins.length; i++)
    {
        if (admins[i].username === un)
        {
            if (admins[i].password === pw)
            {
                console.log("login successful!")
                res.render('admin/admin-dashboard.ejs', {name : req.body.name})
            }
            else
            {
                continue;
                // console.log("fe mashakel")
                // res.render('error.ejs')
            }
        }
        else
        {
            continue;
            // console.log("fe mashakel")
            // res.render('error.ejs')
        }
    }
    
})

/*  da code el signups
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
*/

// const hashPass = await bcrypt.hash(req.body.pass, 10)  di 3shan nsave el pass hashed fl sign up

export default router;