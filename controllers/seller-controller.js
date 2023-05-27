
import { body, validationResult } from "express-validator";
import seller from '../models/sellerData.js';
import bcrypt from 'bcrypt';

// Validation middleware for signups
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
    const sellers = await seller.find({});
    var i;
    for (i = 0; i < sellers.length; i++) {
      if (sellers[i].username === un) {
        if (bcrypt.compareSync(pw, sellers[i].password)) {
          console.log("login successful!")
          return res.redirect('/seller/products')
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
// const checkUN = (req, res) => {
//   var query = { UserName: req.body.UserName };
//   Employees.find(query)
//       .then(result => {
//           if (result.length > 0) {
//               res.send('taken');
//           }
//           else {
//               res.send('available');
//           }
//       })
//       .catch(err => {
//           console.log(err);
//       });
// };

const signups = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("seller-sign-in", {
      errors: errors.array(),
    });
  } else {
    try {
      const hashPass = await bcrypt.hash(req.body.pass, 10);
      const newseller = new seller({
        username: req.body.name,
        password: hashPass,
      });
      await newseller.save();
      console.log('registration successful!');
      return res.redirect('/seller/dashboard');
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

export { signins, signups, signupValidation};