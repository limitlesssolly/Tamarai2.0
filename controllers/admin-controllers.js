import { body, validationResult } from "express-validator";
import admin from '../models/adminData.js';
import products from '../models/productData.js';
import bcrypt from 'bcrypt';
import asyncHandler from "express-async-handler"

// Validation middleware for signups
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
  var un = req.body.name;
  var pw = req.body.pass;

  try {
    const admins = await admin.find({});
    var i;
    for (i = 0; i < admins.length; i++) {
      if (admins[i].username === un) {
        if (bcrypt.compareSync(pw, admins[i].password)) {
          console.log("login successful!")
          return res.redirect('/admin/dashboard')
        }
        else {
          continue;
        }
      }
      else {
        continue;
      }
    }
    console.log("Invalid credentials");
    return res.render('error.ejs');
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
  }
};

const signups = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("admin-sign-in", {
      errors: errors.array(),
    });
  } else {
    try {
      const hashPass = await bcrypt.hash(req.body.pass, 10);
      const newadmin = new admin({
        username: req.body.name,
        password: hashPass,
      });
      await newadmin.save();
      console.log('registration successful!');
      return res.redirect('/admin/dashboard');
    } catch (err) {
      // console.log(err);
      // return res.status(500).render('error.ejs');
      if (errors && errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
          errors[i].msg
        }
      }
    }
  }
};

const addItem = async (req, res, next) => {
  try {
    const newItem = new products({
      name: req.body.name,
      seller: req.body.seller,
      price: req.body.price,
      count: req.body.count,
      category: req.body.category,
    });
    // console.log(newItem);
    await newItem.save();
    console.log('Item added successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).render('error.ejs');
}
};

const getItem = async (req, res, next) => {
  try {
    const data = await products.findById(req.params.id);
    res.json(data)
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

module.exports = {signins, signups, addItem, getItem, getItems, updateItem, deleteItem };