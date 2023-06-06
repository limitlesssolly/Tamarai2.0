import rege from '../models/tryseller.js';
import products from '../models/productData.js';
import bcrypt from 'bcrypt';

const signins = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).send({ msg: 'Please enter a username' });
  else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
  else {
    const sellerdb = await rege.findOne({ username });
    if (!sellerdb) return res.status(401).send({ msg: 'Please enter a valid username' });
    else if (sellerdb) {
      if (bcrypt.compareSync(password, sellerdb.password)) {
        req.session.user = sellerdb;
        console.log('correct');
        return res.redirect('/seller/dashboard');
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
        const existingUser = await rege.findOne({ email });
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
        const hashPass = await bcrypt.hash(password, 10);
        const CPassword = await bcrypt.hash(confirmPassword, 10);
        const newuser = new rege({
            email: email,
            username: username,
            password: hashPass,
            confirmPassword: CPassword,
            type: "seller",
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
        return res.redirect("/seller/dashboard");
    }
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
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
      category: req.body.categories,
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
  addItem
};