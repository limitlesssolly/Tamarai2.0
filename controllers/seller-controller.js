import {body,validationResult} from "express-validator";
// import seller from '../models/sellerRegister.js';
import rege from '../models/tryseller.js';
import products from '../models/productData.js';
import bcrypt from 'bcrypt';

// Validation middleware for signups
const signupValidation = [
  body('name').notEmpty().withMessage('Username is required')
  .isLength({
    min: 4
  }).withMessage('Username must be at least 4 characters long'),
  body('pass')
  .notEmpty().withMessage('Password is required')
  .isLength({
    min: 7
  }).withMessage('Password must be at least 7 characters long')
  .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
  .matches(/[0-9]/).withMessage('Password must contain at least one number')
];

const signins = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).send({ msg: 'Please enter a username' });
  else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
  else {
    const sellerdb = await rege.findOne({ username });
    if (!sellerdb) return res.status(401).send({ msg: 'Please enter a valid username' });
    else if (sellerdb) {
      if (bcrypt.compareSync(password, sellerdb.password)) {
        req.session.rege = sellerdb;
        console.log('correct');
        return res.redirect('/seller/dashboard');
      }
      else return res.status(401).send({ msg: 'Please enter a valid password' });
    }
  }
};


const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("seller-sign-in", {
      errors: errors.array(),
    });
  } else {
    try {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const CPassword = await bcrypt.hash(req.body.confirmPassword, 10);
      const newseller = new rege({
        email: req.body.email,
        username: req.body.username,
        password: hashPass,
        confirmPassword: CPassword,
      });
      await newseller.save();

      //  res.render('seller-register',{message:"sucuss"})
      console.log('Registration successful!');
      return res.redirect('/seller/dashboard/profile/'+ newseller._id );
    } catch (err) {
      console.log(err);
      return res.status(500).render('error.ejs');
    }
  }

};

const addItem = async (req, res, next) => {
  try {
    const newItem = new products({
      name: req.body.name,
      brand: req.body.brand,
      seller: req.body.seller,
      price: req.body.price,
      image: req.body.image,
      count: req.body.count,
      description: req.body.description,
      category: req.body.category,
      color: req.body.color,
    });
    await newItem.save();
    console.log('Item added successfully');
    return res.redirect('/seller/dashboard');
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
  }
};

export {
  signins,
  signup,
  signupValidation,
  addItem
};