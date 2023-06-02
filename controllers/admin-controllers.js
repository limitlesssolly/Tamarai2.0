import admin from '../models/adminData.js';
import products from '../models/productData.js';
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
        return res.redirect('/admin/dashboard/settings/' + admindb._id);
      }
      else return res.status(401).send({ msg: 'Please enter a valid password' });
    }
  }
};

const signups = async (req, res, next) => {
  const { username } = req.body;
  const admindb = await admin.findOne({ $or: [{ username }] });
  if (admindb) {
    res.status(400).send({ msg: 'Admin already exist!' })
  } else {
    const password = await bcrypt.hash(req.body.password, 10);
    const newAdmin = await admin.create({ username, password });
    console.log('Admin Created');
  }
};

const addItem = async (req, res, next) => {
  try {
    const newItem = new products({
      name: req.body.name,
      brand: req.body.brand,
      // image: req.body.img,
      seller: req.body.seller,
      price: req.body.price,
      count: req.body.count,
      // description: req.body.description,
      category: req.body.category,
      // color: req.body.color,
    });
    await newItem.save();
    console.log('Item added successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
  }
};

const getItem = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const productitem = await products.findById(req.params._id);
    res.send(productitem);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getItems = async (req, res, next) => {
  try {
    let data = await products.find();
    console.log(data);
    res.render('/admin/dashboard/sellings', {
      data,
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
};

const updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await products.findByIdAndUpdate(id, updatedData, options)
    console.log(result);
    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
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
  addItem,
  getItem,
  getItems,
  updateItem,
  deleteItem
};