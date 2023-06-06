import { body, validationResult } from "express-validator";
import user from '../models/userRegister.js';
import ProductsData from '../models/productData.js';
import bcrypt from 'bcrypt';
import Categories from '../models/categories.js';

const signupValidation = [
    body('name').notEmpty().withMessage('Username is required')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('pass')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 7 }).withMessage('Password must be at least 7 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
];

const signins = async(req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).send({ msg: 'Please enter a username' });
  else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
  else {
    const userdb = await user.findOne({ username });
    if (!userdb) return res.status(401).send({ msg: 'Please enter a valid username' });
    else if (userdb) {
      if (bcrypt.compareSync(password, userdb.password)) {
        req.session.user = userdb;

        return res.redirect('/user/homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
      }
      else return res.status(401).send({ msg: 'Please enter a valid password' });
    }
  }
};

const signup = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("user-sign-in", {
            errors: errors.array(),
        });
    } else {
        try {
            const hashPass = await bcrypt.hash(req.body.pass, 10);
            const CPassword = await bcrypt.hash(req.body.confirmpass, 10);
            const newuser = new user({
                email: req.body.email,
                username: req.body.name,
                password: hashPass,
                confirmPassword: CPassword,
            });
            await newuser.save();
            console.log('Registration successful!');
            req.session.user = newuser;
            return res.redirect('/user/homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
        } catch (err) {
            console.log(err);
            return res.status(500).render('error.ejs');
        }
    }


};
export const getHomepage = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        const cat = await Categories.find();
        console.log('productData:', productData);
        res.render('user/user-homepage', { Title: "Homepage", productData, cat: cat }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

// const register = async (req, res) => {

//   //get data from form
//   const { firstName, lastName, email, password, confirmPass } = req.body;

//   let errorMsg = {};

//   //validate data
//   if (firstName.trim() == "") errorMsg.firstName = "First name is required";

//   if (lastName.trim() == "") errorMsg.lastName = "Last name is required";

//   let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (email.trim() == "") errorMsg.email = "Email is required";
//   else if (!email.match(emailFormat)) errorMsg.email = "Invalid Email";
//   else {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       errorMsg.email = "Email already exists!";
//     }
//   }

//   if (password.trim() == "") errorMsg.password = "Password is required";
//   else if (password.trim().length < 8)
//     errorMsg.password = "Password must be at least 8 characters";

//   if (password.trim() !== confirmPass.trim())
//     errorMsg.confirmPass = "Passwords do not match";

//   if (Object.keys(errorMsg).length > 0) {
//     for (let key in errorMsg) {
//       console.log(errorMsg[key]);
//     }
//     if (req.query.ajax)
//       return res.json({ errors: errorMsg, admin: false });
//     else
//       return res.render("register", { errorMsg, admin: false });
//   }

//   //save user to db
//   const user = new User({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     userType: "user",
//   });

//   try {
//     await user.save();
//     console.log("User saved:", user);
//     //save user into algolia
//     usersIndex.saveObject({
//       objectID: user._id.toString(),
//       name: user.firstName + " " + user.lastName,
//       email: user.email,
//       userType: user.userType,
//       createdAt: user.createdAt,
//     });
//   }
//   catch (err) {
//     console.log(err);
//   }
//   //data ok
//   //create session
//   req.session.userID = user._id;
//   req.session.userType = user.userType;
//   req.session.firstName = user.firstName;
//   req.session.lastName = user.lastName;
//   req.session.email = user.email;

//   if (req.query.ajax) {
//     console.log("Registration done using ajax");
//     return res.json({ errors: errorMsg, admin: false });
//   }
//   else {
//     console.log("Registration done NOT using ajax");
//     return res.redirect("/account");
//   }
// };

export {
    signins,
    signup,
    signupValidation,
};