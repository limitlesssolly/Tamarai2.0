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

const signins = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username) return res.status(400).send({ msg: 'Please enter a username' });
    else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
    else {
        const userdb = await user.findOne({ username });
        if (!userdb) return res.status(401).send({ msg: 'Please enter a valid username' });
        else if (userdb) {
            if (bcrypt.compareSync(password, userdb.password)) {
                req.session.user = userdb;

                return res.redirect('/user/homepage');
            }
            else return res.status(401).send({ msg: 'Please enter a valid password' });
        }
    }
};

const signup = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    let errorMsg = {};

    if (username.trim() == "") errorMsg.username = "Username is required";

    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.trim() == "") errorMsg.email = "Email is required";
    else if (!email.match(emailFormat)) errorMsg.email = "Invalid Email";
    else {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            errorMsg.email = "Email already exists!";
        }
    }

    if (password.trim() == "") errorMsg.password = "Password is required";
    else if (password.trim().length < 8)
        errorMsg.password = "Password must be at least 8 characters";

    if (password.trim() !== confirmPassword.trim())
        errorMsg.confirmPassword = "Passwords do not match";

    if (Object.keys(errorMsg).length > 0) {
        for (let key in errorMsg) {
            console.log(errorMsg[key]);
        }
        if (req.query.ajax)
            return res.json({ errors: errorMsg, admin: false });
        else
            return res.render("user/user-register", { errorMsg, admin: false });
    }
    try {
        await user.save();
        console.log("User saved:", user);
        //save user into algolia
        usersIndex.saveObject({
            objectID: user._id.toString(),
            name: user.firstName + " " + user.lastName,
            email: user.email,
            userType: user.userType,
            createdAt: user.createdAt,
        });
    }
    catch (err) {
        console.log(err);
    }
    try {
        const hashPass = await bcrypt.hash(password, 10);
        const CPassword = await bcrypt.hash(confirmPassword, 10);
        const newuser = new user({
            email: email,
            username: username,
            password: hashPass,
            confirmPassword: CPassword,
            type: "user",
        });
        await newuser.save();
        console.log('Registration successful!');
        req.session.Id = user._id;
        req.session.type = user.type;
        req.session.username = user.username;
        req.session.email = user.email;

    if (req.query.ajax) {
        console.log("Registration done using ajax");
        return res.json({ errors: errorMsg, admin: false });
    }
    else {
        console.log("Registration done NOT using ajax");
        return res.redirect("/user/homepage");
    }
        // req.session.user = newuser;
        // return res.redirect('/user/homepage/profile/' + newuser._id);
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
    }
};


const checkUN = (req, res) => {
    var query = { username: req.body.username };
    user.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const getHomepage = async (req, res) => {
    try {
        const productData = await ProductsData.find();
        const cat = await Categories.find();
        console.log('productData:', productData);
        res.render('user/user-homepage', { Title: "Homepage", productData, cat: cat });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export {
    signins,
    signup,
    signupValidation,
    checkUN,
};