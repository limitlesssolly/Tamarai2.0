import user from '../models/userRegister.js';
import ProductsData from '../models/productData.js';
import bcrypt from 'bcrypt';
import Categories from '../models/categories.js';

const signins = async(req, res, next) => {
    const { username, password } = req.body;

    let errorMsg = {};
    const userdb = await user.findOne({ username });
    let bools = false;

    if (username.trim() == "") errorMsg.username = "Username is required";
    else if (!userdb) errorMsg.username = "Invalid Username";

    if (password.trim() == "") errorMsg.password = "Password is required";
    else {
        if (bcrypt.compareSync(password, userdb.password)) bools = true;
        else errorMsg.password = "Invalid Password";
    }

    if (Object.keys(errorMsg).length > 0) {
        for (let key in errorMsg) {
            console.log(errorMsg[key]);
            break;
        }
        if (req.query.ajax)
            return res.json({ errors: errorMsg, admin: false });
        else
            return res.render("user/user-sign-in", { errorMsg, admin: false });
    }
    if (userdb) {
        if (bools) {
            req.session.Id = userdb._id;
            req.session.type = userdb.type;
            req.session.username = userdb.username;
            console.log(req.session.Id);
            console.log(req.session.type);
            console.log(req.session.username);
            return res.redirect('/user/homepage');
        }
    }
};

const signup = async(req, res, next) => {
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
            break;
        }
        if (req.query.ajax)
            return res.json({ errors: errorMsg, admin: false });
        else
            return res.render("user/user-register", { errorMsg, admin: false });
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
        req.session.Id = newuser._id;
        req.session.type = newuser.type;
        req.session.username = newuser.username;
        req.session.email = newuser.email;

        if (req.query.ajax) {
            console.log("Registration done using ajax");
            return res.json({ errors: errorMsg, admin: false });
        } else {
            console.log("Registration done NOT using ajax");
            return res.redirect("/user/homepage");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
    }
};

export const getHomepage = async(req, res) => {
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
};