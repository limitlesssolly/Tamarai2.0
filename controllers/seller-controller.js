
import seller from '../models/sellerData.js';
const signins = async (req, res, next) => {
  var un = req.body.name;
  var pw = req.body.pass;

  const sellers = await seller.find({});
  // console.log(sellers)
  var i;
  for (i = 0; i < sellers.length; i++) {
    if (sellers[i].username === un) {
      if (sellers[i].password === pw) {
        console.log("login successful!")
        res.redirect('/seller')
      }
      else {
        continue;
      }
    }
    else {
      continue;
    }
  }
  console.log("fe mashakel")
  res.render('error.ejs')
};

const signups = async (req, res, next) => {

  // const hashPass = await bcrypt.hash(req.body.pass, 10)

  const newseller = new seller({
    username: req.body.username,
    password: req.body.password,
})
newseller.save()
.then((result)=>
{
  console.log('registration successful!')
    // res.render('admin/admin-dashboard.ejs')
})
.catch(err=>{
    console.log(err);
})
};

export { signins ,signups};
