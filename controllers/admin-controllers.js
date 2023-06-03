import admin from '../models/adminData.js';
import products from '../models/productData.js';
import user from '../models/userData.js';
import bcrypt from 'bcrypt';

const signins = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).send({ msg: 'Please enter a username' });
  else if (!password) return res.status(400).send({ msg: 'Please enter a password' });
  else {
    const admindb = await admin.findOne({ username });
    if (!admindb) return res.status(401).send({ msg: 'Please enter a valid username' });
    else if (admindb) {
      if (bcrypt.compareSync(password, admindb.password)) {
        req.session.admin = admindb;
        return res.redirect('/admin/dashboard');
      }
      else return res.status(401).send({ msg: 'Please enter a valid password' });
    }
  }
};

const signups = async (req, res, next) => {
  console.log("7mada");
  const { username } = req.body;
  const admindb = await user.findOne({ $or: [{ username }] });
  if (admindb) {
    res.status(400).send({ msg: 'Admin already exist!' })
  } else {
    const password = await bcrypt.hash(req.body.password, 10);
    const newAdmin = await user.create({ username, password });
    newAdmin.save();
    console.log('user Created');
    res.redirect('/admin/dashboard/usings')
  }
};

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


// const getUsers = async (req, res, next) => {
//   try {
//     const users = await user.find({});
//     return res.render('../views/Admin/admin-users');
//   } catch (err) {
//     console.log(err);
//     return res.status(500).render('error.ejs');
//   }
// };

export {
  signins,
  signups,
};