// import HttpError from "http-errors";
// import express from 'express';
// import path from "path";
// import cookieParser from "cookie-parser";
// import logger from "morgan";
// import { fileURLToPath } from "url";
// import expressLayouts from 'express-ejs-layouts';

// const app = express();

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'public')));
// app.use('/', router);

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
    
//     // render the error page
//     res.status(err.status || 500);
//     res.render('pages/error');
//   });



// export default app;