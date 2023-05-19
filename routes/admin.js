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
    const admins = await admin.findOne({ username: un });
    console.log(admins)

    if (admins === null)
    {
        // document.getElementById('Uerror').innerHTML = 'Enter a valid username';
        // document.getElementById('Uerror').style.display = 'block';
        console.log("fe mashakel")
        res.render('error.ejs')
    }
    else
    {
        if (admin.findOne({ password: pw }))
        {
            console.log("login successful!")
            res.render('admin/admin-dashboard.ejs', {name : req.body.name})
        }
        else
        {
            console.log("fe mashakel")
            res.render('error.ejs')
        }
    }
})

// const hashPass = await bcrypt.hash(req.body.pass, 10)  di 3shan nsave el pass hashed fl sign up

export default router;