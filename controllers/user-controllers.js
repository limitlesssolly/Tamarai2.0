import {body, validationResult} from "express-validator";
import users from '../models/userData.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// const validateSignup = (req, res, next) => {
//     const { name, pass} = req.body;
//     // Empty fields
//     if(!name) {
//         return res.status(400).json({ msg: 'Username is required' });
//     }
//     if(!pass) {
//         return res.status(400).json({ msg: 'Password is required' });
//     }
//     // validate name & password
//     name.isLength({ min: 4 }).withMessage('Username must be at least 4 characters long');
//     pass.isLength({ min: 7 }).withMessage('Password must be at least 7 characters long');
//     pass.matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter');
//     pass.matches(/[0-9]/).withMessage('Password must contain at least one number');
// };

const signupValidation = [
  body('name').notEmpty().withMessage('Username is required')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  body('pass')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 7 }).withMessage('Password must be at least 7 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
];

// const hashPassword = (pass) => {
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPassword = bcrypt.hashSync(pass, salt);
//     return hashedPassword;
// };

const signins = async (req, res, next) => {
  var un = req.body.name;
  var pw = req.body.pass;

  try {
    const users = await users.find({});
    var i;
    for (i = 0; i < users.length; i++) {
      if (users[i].username === un) {
        if (bcrypt.compareSync(pw, users[i].password)) {
          console.log("login successful!")
          return res.redirect('/user/user-homepage');
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

const signups = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("user-homepage", {
      errors: errors.array(),
    });
  } else {
    try {
      const hashPass = await bcrypt.hash(req.body.pass, saltRounds);
      const newuser = new user({
        username: req.body.name,
        password: hashPass,
      });
      await newuser.save();
      console.log('registration successful!');
      return res.redirect('/user/homepage');
    } catch (err) {
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

export { signins, signups, signupValidation };