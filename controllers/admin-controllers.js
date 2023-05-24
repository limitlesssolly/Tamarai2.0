import { body, validationResult } from "express-validator";
import admin from '../models/adminData.js';
import bcrypt from 'bcrypt'

// Validation middleware for signups
const signupValidation = [
  body('name')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  body('pass')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
];

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
      if (bcrypt.compareSync(pw, admins[i].password)) {
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

  const hashPass = await bcrypt.hash(req.body.pass, 10)

  const newadmin = new admin({
    username: req.body.name,
    password: hashPass,
  });

  newadmin.save()
    .then((result) => {
      console.log('registration successful!')
      res.redirect('/admin/dashboard')
    })
    .catch(err => {
      console.log(err);
      res.render('error.ejs')
    })
};

export { signins, signups };