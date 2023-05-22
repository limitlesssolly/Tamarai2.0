import { body, validationResult } from "express-validator";
import admin from '../models/adminData.js';
import bcrypt from 'bcrypt'

const signins = async (req, res, next) => {
  var un = req.body.name;
  var pw = req.body.pass;

  const admins = await admin.find({});
  // console.log(admins)
  var i;
  for (i = 0; i < admins.length; i++) {
    if (admins[i].username === un) {
      if (admins[i].password === pw) {
        console.log("login successful!")
        res.redirect('/admin/dashboard')
      }
      else {
        continue;
      }
    }
    else {
      continue;
    }
  }
  console.log("fe mashakel")
  res.render('error.ejs')
};

const signups = async (req, res, next) => {

  // const hashPass = await bcrypt.hash(req.body.pass, 10)

  const newadmin = new admin({
    username: req.body.name,
    password: req.body.pass,
})
newadmin.save()
.then((result)=>
{
  console.log('registration successful!')
    // res.render('admin/admin-dashboard.ejs')
})
.catch(err=>{
    console.log(err);
})
};

export { signins ,signups};