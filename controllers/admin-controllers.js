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
  
    let admindb = await admin.findOne({ username });
    let bools = false;
    if (username.trim() == "") errorMsg.username = "Username is required";
    else if (!admindb) errorMsg.username = "Invalid Username";
  
    if (password.trim() == "") errorMsg.password = "Password is required";
    else {
      if (bcrypt.compareSync(password, admindb.password)) bools = true;
      else errorMsg.password = "Invalid Password";
    }
  
    if (Object.keys(errorMsg).length > 0) {
      for (let key in errorMsg) {
          console.log(errorMsg[key]);
      }
      if (req.query.ajax)
          return res.json({ errors: errorMsg, admin: false });
      else
          return res.render("admin/admin-sign-in", { errorMsg, admin: false });
  }
    if (admindb)
    {
      if (bools) {
        req.session.user;
        console.log(req.session.user);
        return res.redirect('/admin/dashboard');
      }
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
        req.session.Id = newuser._id;
        req.session.type = newuser.type;
        req.session.username = newuser.username;
        req.session.email = newuser.email;

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
        req.session.Id = newadmin._id;
        req.session.type = newadmin.type;
        req.session.username = newadmin.username;

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