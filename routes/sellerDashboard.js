import { Router } from "express";
const router = Router();
import Prod from "../models/productData.js";
import cats from "../models/categories.js";
import { addItem } from "../controllers/seller-controller.js";
import { getSellerProducts } from "../controllers/products-controllers.js";
import regi from "../models/tryseller.js";

/* GET /seller/dashboard page. */
router.get("/", function (req, res, next) {
  res.render("seller/seller-products");
});

router.get("/analysis", async function (req, res, next) {
  console.log("hi");
  res.render("seller/seller-analysis");
});

/* GET /seller/dashboard/add page. */
// router.get('/add', function (req, res, next) {
//     res.render('seller/seller-add');
// });

/* GET /seller/dashboard/add page. */
router.get("/add", async function (req, res, next) {
  const Cats = await cats.find();
  const regs = await regi.findById(req.session.Id);
  const sell = regs.username;
  res.render("seller/seller-add", {Cats, sell});
});

/* post an item */
router.post("/add", addItem);

router.get("/products", async function (req, res, next) {
  const regs = await regi.findById(req.session.Id);
  const sell = regs.username;
  const Products = await Prod.find();
  res.render("seller/seller-products", {Products, sell});
});

/* GET /seller/dashboard/view page. */
router.get("/view", async function (req, res, next) {
  const Products = await Prod.find();
  res.render("seller/seller-products", {Products});
});

router.get("/view/view/:id", async function (req, res, next) {
  const Products = await Prod.findById(req.params.id);
  res.render("seller/seller-single-product", {
    Products,
  });
});

/* Delete One item using id */
router.get("/view/delete/:id", async function (req, res, next) {
  const id = req.params.id;
  const data = await Prod.findByIdAndDelete(id);
  console.log(`Item ${data.name} has been deleted..`);
  return res.redirect("/seller/dashboard/products");
});


router.post('/view/edit/:id', async (req, res) => {
  console.log("Entered post");
  const Products = await Prod.findById(req.params.id);
  Products.name = req.body.name;
  Products.brand = req.body.brand;
  Products.price = req.body.price;
   Products.description = req.body.description;
   Products.count = req.body.count;
   Products.category = req.body.category;
  // regs.color=req.body.color;
  await Products.save();

  // Retrieve the updated seller data from the database
  const updatedpro = await Prod.findById(req.params.id);
  const Cats = await cats.find();
console.log("WIll render");
  // Render the "profile" view with the updated seller data
  res.render('seller/seller-single-product', { Products: updatedpro, Cats });
  console.log("DONE");
});

/* GET /seller/dashboard/info page. */
router.get("/info", function (req, res, next) {
  res.render("seller/seller-info");
});

/* GET /seller/dashboard/profile page. */
router.get("/profile", async (req, res) => {
  const sellers = await regi.find();
  res.render("seller/seller-profile", { sellers });
});

/* GET /seller/dashboard/profile page. */
router.get("/profile/:id", async (req, res) => {
  const regs = await regi.findById(req.session.Id);
  res.render("seller/seller-profile", { regs });
});

router.post("/profile/:id", async (req, res) => {
  const regs = await regi.findById(req.params.id);
  regs.username = req.body.username;
  regs.email = req.body.email;
  // regs.password = req.body.password;
  await regs.save();

  // Retrieve the updated seller data from the database
  const updatedSell = await regi.findById(req.params.id);

  // Render the "profile" view with the updated seller data
  res.render("seller/seller-profile", {
    regs: updatedSell,
  });
});

// router.use((req, res, next) => {
//   if (req.session.user) next();
//   else {
//     res.send("You must login");
//   }
// });

export default router;
