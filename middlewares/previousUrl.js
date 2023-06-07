const previousUrl = (req, res, next) => {

    req.session.previousUrl = req.headers.referer;
    // req.session.previousUrl=fullUrl;
    next();
}
export default previousUrl;