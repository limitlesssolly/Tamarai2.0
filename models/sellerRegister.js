const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  confirmPassword: String
});

const Seller = mongoose.model('SellerData', sellerSchema);

app.post('/seller/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Create a new seller document
  const seller = new Seller({
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword
  });

  // Save the seller document to the database
  seller.save((err) => {
    if (err) {
      console.log(err);
      res.send('Error saving seller data');
    } else {
      res.redirect('/seller/products');
    }
  });
}); 