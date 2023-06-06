import admin from '../models/adminData.js';
import seller from '../models/tryseller.js';
import products from '../models/productData.js';
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
  const { username, password } = req.body;
  if (!username) return res.status(400).send({ msg: 'Please enter a username' });
  else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
  else {
    const admindb = await admin.findOne({ username });
    if (!admindb) return res.status(401).send({ msg: 'Please enter a valid username' });
    else if (admindb) {
      if (bcrypt.compareSync(password, admindb.password)) {
        req.session.user = admindb;
        return res.redirect('/admin/dashboard');
      }
      else return res.status(401).send({ msg: 'Please enter a valid password' });
    }
  }
};

const signups = async (req, res, next) => {
  const { username, email } = req.body;
  const userdb = await user.findOne({ $or: [{ username }, { email }] });
  if (userdb) {
    res.status(400).send({ msg: 'user already exist!' })
  } else {
    const Password = await bcrypt.hash(req.body.password, 10);
    const CPassword = await bcrypt.hash(req.body.confirmpassword, 10);
    const newuser = new user({
      email: req.body.email,
      username: req.body.username,
      password: Password,
      confirmPassword: CPassword,
      type: "user",
    });
    await newuser.save();
    console.log('user Created');
    res.redirect('/admin/dashboard/usings')
  };
};

const signupstoo = async (req, res, next) => {
  const { username, email } = req.body;
  const sellerdb = await seller.findOne({ $or: [{ username }, { email }] });
  if (sellerdb) {
    res.status(400).send({ msg: 'seller already exist!' })
  } else {
    const Password = await bcrypt.hash(req.body.password, 10);
    const CPassword = await bcrypt.hash(req.body.confirmpassword, 10);
    const newseller = new seller({
      email: req.body.email,
      username: req.body.username,
      password: Password,
      confirmPassword: CPassword,
      type: "seller",
    });
    await newseller.save();
    console.log('seller Created');
    res.redirect('/admin/dashboard/usings')
  };
};

const signupstre = async (req, res, next) => {
  const {username} = req.body;
  const admindb = await admin.findOne({ $or: [{ username }] });
  if (admindb) {
    res.status(400).send({ msg: 'admin already exist!' })
  } else {
    const Password = await bcrypt.hash(req.body.password, 10);
    const newadmin = new admin({
      username: req.body.username,
      password: Password,
      type: "admin",
    });
    await newadmin.save();
    console.log('admin Created');
    res.redirect('/admin/dashboard/usings')
  };
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