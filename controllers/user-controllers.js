import {body, validationResult} from "express-validator";
import user from '../models/userRegister.js';

import bcrypt from 'bcrypt';

// const saltRounds = 10;



const signupValidation = [
  body('name').notEmpty().withMessage('Username is required')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  body('pass')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 7 }).withMessage('Password must be at least 7 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
];



const signins = async (req, res, next) => {
  var un = req.body.name;
  var pw = req.body.pass;

  try {
    const users = await user.find({});
    var i;
    for (i = 0; i < users.length; i++) {
      if (users[i].username === un) {
        if (bcrypt.compareSync(pw, user[i].password)) {
          console.log("login successful!")
          return res.redirect('/user/homepage');
        }
        else {
          continue;
        }
      }
      else {
        continue;
      }
    }
    console.log("Invalid credentials");
    return res.render('error.ejs');
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("user-sign-in", {
      errors: errors.array(),
    });
  } else {
    try {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const newuser = new user({
        email: req.body.email,
        username: req.body.username,
        password: hashPass,
        confirmPassword: req.body.confirmPassword
      });
      await newuser.save();
      console.log('Registration successful!');
      return res.redirect('/user/homepage');
    }  catch (err) {
      // console.log(err);
      // return res.status(500).render('error.ejs');
      if (errors && errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
          errors[i].msg
        }
      }
    }
  }
};

export { signins, signup, signupValidation };