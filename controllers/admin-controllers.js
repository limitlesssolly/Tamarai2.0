import admin from '../models/adminData.js';
import rege from '../models/tryseller.js';
import user from '../models/userRegister.js';
import kitty from '../models/categories.js'
import bcrypt from 'bcrypt';

// const deleteUser = async (req, res,next)=>{
//   Employees.findByIdAndDelete(req.params.id)
//   .then(result => {
     
//       if (err) {
//         throw err;
//       }
//       res.redirect('/admin/admin-dashboard', { user: (req.session.user === undefined ? "" : req.session.user) });
  
//   })
//   .catch(err => {
//     console.log(err);
//   });
// };

const signins = async (req, res, next) => {
  const { username, password} = req.body;
  let errorMsg = {};

  if (username.trim() == "") errorMsg.username = "Username is required";

  if (password.trim() == "") errorMsg.password = "Password is required";

  if (Object.keys(errorMsg).length > 0) {
      for (let key in errorMsg) {
          console.log(errorMsg[key]);
      }
      if (req.query.ajax)
          return res.json({ errors: errorMsg, admin: false });
      else
          return res.render("admin/admin-sign-in", { errorMsg, admin: false });
  }
  try {
    const admindb = await admin.findOne({ username });
    if (!admindb) return res.status(401);
    else if (admindb) {
      if (bcrypt.compareSync(password, admindb.password)) {
        req.session.Id = user._id;
        req.session.type = user.type;
        req.session.username = user.username;
        return res.redirect('/admin/dashboard');
      }
    }} catch (err) {
      console.log(err);
      return res.status(500).render('error.ejs');
  }
};

const signups = async (req, res, next) => {
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
            return res.render("admin/admin-add-user", { errorMsg, admin: false });
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
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
    }
};

const signupstoo = async (req, res, next) => {
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
            return res.render("admin/admin-add-seller", { errorMsg, admin: false });
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
        return res.redirect("/admin/dashboard/usings");
    }
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
    }
};

const signupstre = async (req, res, next) => {
  const { username, password} = req.body;
    let errorMsg = {};

    if (username.trim() == "") errorMsg.username = "Username is required";

    if (password.trim() == "") errorMsg.password = "Password is required";
    else if (password.trim().length < 8)
        errorMsg.password = "Password must be at least 8 characters";

    if (Object.keys(errorMsg).length > 0) {
        for (let key in errorMsg) {
            console.log(errorMsg[key]);
        }
        if (req.query.ajax)
            return res.json({ errors: errorMsg, admin: false });
        else
            return res.render("admin/admin-add-admin", { errorMsg, admin: false });
    }
    try {
        const hashPass = await bcrypt.hash(password, 10);
        const newadmin = new admin({
            username: username,
            password: hashPass,
            type: "admin",
        });
        await newadmin.save();
        console.log('Registration successful!');
        req.session.Id = user._id;
        req.session.type = user.type;
        req.session.username = user.username;

    if (req.query.ajax) {
        console.log("Registration done using ajax");
        return res.json({ errors: errorMsg, admin: false });
    }
    else {
        console.log("Registration done NOT using ajax");
        return res.redirect("/admin/dashboard/usings");
    }
    } catch (err) {
        console.log(err);
        return res.status(500).render('error.ejs');
    }
};

const addCategory = async (req, res, next) => {
  const {cats} = req.body;
  const category = await kitty.findOne({ $or: [{ cats }] });
  if (category) {
    res.status(400).send({ msg: 'category already exist!' })
  } else {
    const newCat = new kitty({name: cats});
    await newCat.save();
    console.log('category Created');
    res.redirect('/admin/dashboard');
  };
}

const updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: false };

    const result = await products.findByIdAndUpdate(id, updatedData, options)
    console.log(result);
    res.redirect('/admin/dashboard/sellings/view/' + id)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const noOfusers= async(req,res,next)=>
{
  try{
    const id=req.params.id;

  }
  catch(e){
    res.send(e);
  }
}
export {
  signins,
  signups,
  signupstoo,
  signupstre,
  addCategory,
  // deleteUser
};