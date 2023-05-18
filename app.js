import express from "express";
const app = express();

import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {
    fileURLToPath
} from "url";
// import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import expressLayouts from "express-ejs-layouts";

//importing the routes
import mainRouter from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import sellerRouter from './routes/seller.js';

// import adminNavRouter from "./routes/adminNav.js"

//setup routes
app.use('/', mainRouter);
app.use('/', adminRouter);
app.use('/seller', sellerRouter); // routes
// app.use('/partials', adminNavRouter);

 
import { render } from "ejs";
//Read the current directory name
export const __filename = fileURLToPath(
    import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);


// view engine setup
app.set("views", path.join(__dirname, "views"));// to join th static folder "views" which contains the ejs files so that it can run 
app.set("view engine", "ejs");// first thin we do when using ejs 

app.use(logger("dev"));
app.use(fileUpload());
// app.use(session({ secret: 'Your_Secret_Key' }))
app.use(express.json());
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));

app.use(express.urlencoded({
    extended: true
}));

app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log("ENV: ", app.get('env'));

//connecting to the database
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://shahd2100756:RkBLQ6Z3fdyv70qJ@cluster0.huaxthr.mongodb.net/adminData?retryWrites=true&w=majority")
    .then(result => {
        console.log("connected to the goose");
    })
    .catch(err => {
        console.log(err);
    })
app.use(express.static(path.join(__dirname, 'HTML')));
 //setup routes
app.use('/', mainRouter);
app.use('/', adminRouter);
app.use('/', adminNavRouter);

 // error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index'));
});
  


 




app.set('port', process.env.PORT || 7777);

export default app;