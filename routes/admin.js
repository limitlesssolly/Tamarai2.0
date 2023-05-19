import { Router } from 'express';
const router = Router();
import  Admin  from '../models/adminData.js';

/* GET /admin page. */
router.get('/', function (req, res, next){
    res.render('admin-sign-in');
})

/* POST /admin page. */
router.post('/', async function(req, res, next)
{
    try
    {
        var query = { namer: req.body.name, passes: req.body.pass };
        if(Admin.find(query))
        {
            console.log("login successful!")
            res.render('admin/admin-dashboard.ejs', {name : req.body.name})
        }
    }
    catch
    {
        res.send("Wrong deets")
    }
})

// const hashPass = await bcrypt.hash(req.body.pass, 10)  di 3shan nsave el pass hashed fl sign up

export default router;