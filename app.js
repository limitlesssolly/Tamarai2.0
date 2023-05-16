import express from "express";
let app = express();
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import mainRouter from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import adminNavRouter from "./routes/adminNav.js"
//Read the current directory name
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

// view engine setup
app.set("views", path.join(__dirname, "views"));// to join th static folder "views" which contains the ejs files so that it can run 
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('layout', 'layouts/layout');
app.use(expressLayouts);

//setup cookie parser middleware
app.use(cookieParser());

//setup static folder for serving static files in Express
app.use(express.static(path.join(__dirname, 'public')));// to join th static folder "public" which contains the "js(routes)" files so that it can run 
console.log("ENV: ", app.get('env'));

app.use(express.static(path.join(__dirname, 'HTML')));
//setup routes
app.use('/', mainRouter);
app.use('/', adminRouter);
app.use('/', adminNavRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index'));
});

app.set('port', process.env.PORT || 7777);

export default app;