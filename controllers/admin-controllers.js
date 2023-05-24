import { body, validationResult } from "express-validator";
import admin from '../models/adminData.js';
import bcrypt from 'bcrypt'

// const validateSignup = [
//   body("username").notEmpty().withMessage("Username is required"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters"),
//   body("password")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
//     )
//     .withMessage(
//       "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
//     ),
//   body("confirmPassword")
//     .custom((value, { req }) => value === req.body.password)
//     .withMessage("Passwords do not match"),
// ];

// const signupController = (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.render("index", {
//       errors: errors.array(),
//     });
//   } else {
//     res.send("Signup successful");
//   }
// };

const signins = async (req, res, next) => {
  var un = req.body.name;
  var pw = req.body.pass;

  const admins = await admin.find({});
  // console.log(admins)
  console.log('shghal')
  var i;
  for (i = 0; i < admins.length; i++) {
    if (admins[i].username === un) {
      console.log('shghal')
      if (admins[i].password.compareSync(pw)) {
        
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

  const hashPass = await bcrypt.hash(req.body.password, 10)

  const newadmin = new admin({
    username: req.body.name,
    password: hashPass,
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

export {signins ,signups};