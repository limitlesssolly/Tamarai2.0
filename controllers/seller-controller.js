import rege from '../models/tryseller.js';
import products from '../models/productData.js';
import bcrypt from 'bcrypt';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signins = async (req, res, next) => {
  const { username, password} = req.body;

  let errorMsg = {};

  const sellerdb = await rege.findOne({ username });
  let bools = false;
  if (username.trim() == "") errorMsg.username = "Username is required";
  else if (!sellerdb) errorMsg.username = "Invalid Username";

  if (password.trim() == "") errorMsg.password = "Password is required";
  else {
    if (bcrypt.compareSync(password, sellerdb.password)) bools = true;
    else errorMsg.password = "Invalid Password";
  }

  if (Object.keys(errorMsg).length > 0) {
    for (let key in errorMsg) {
        console.log(errorMsg[key]);
    }
    if (req.query.ajax)
        return res.json({ errors: errorMsg, admin: false });
    else
        return res.render("seller/seller-sign-in", { errorMsg, admin: false });
}
  if (sellerdb)
  {
    if (bools) {
      req.session.Id = sellerdb._id;
        req.session.type = sellerdb.type;
        req.session.username = sellerdb.username;
        console.log(req.session.Id);
        console.log(req.session.type);
        console.log(req.session.username);
      return res.redirect('/seller/dashboard');
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
        const newseller = new rege({
            email: email,
            username: username,
            password: hashPass,
            confirmPassword: CPassword,
            type: "seller",
        });
        await newseller.save();
        console.log('Registration successful!');
        req.session.Id = newseller._id;
        req.session.type = newseller.type;
        req.session.username = newseller.username;
        req.session.email = newseller.email;

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
  let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files.img;
    uploadPath = path.join(__dirname,'../public/images/products/' + req.body.name + path.extname(imgFile.name));
  try {
    imgFile.mv(uploadPath,async function (err) { 
    const newItem = new products({
      name: req.body.name,
      brand: req.body.brand,
      seller: req.body.seller,
      price: req.body.price,
      image: req.body.name +  path.extname(imgFile.name),
      count: req.body.count,
      description: req.body.description,
      category: req.body.categories,
      color: req.body.color,
    });
    await newItem.save();
    console.log('Item added successfully');
    return res.redirect('/seller/dashboard');
  })
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
  }
};

// const addItem = async (req, res, next) => {
//   try {
//     let imgFile;
//     let uploadPath;
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     imgFile = req.files.img;
//     uploadPath = path.join(__dirname, '../public/images/' + req.body.name + path.extname(imgFile.name));
    
//     const newItem = new products({
//       name: req.body.name,
//       brand: req.body.brand,
//       seller: req.body.seller,
//       price: req.body.price,
//       image: req.body.name +  path.extname(imgFile.name),
//       count: req.body.count,
//       description: req.body.description,
//       category: req.body.categories,
//       color: req.body.color,
//     });
//     await newItem.save();
//     console.log('Item added successfully');
//     return res.redirect('/seller/dashboard');
//   } catch (err) {
//     console.log(err);
//     return res.status(500).render('error.ejs');
//   }
// };

export {
  signins,
  signup,
  addItem
};