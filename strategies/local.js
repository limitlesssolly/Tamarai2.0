import passport from "passport";
import strategy, { Strategy } from "passport-local";

passport.use(
    new Strategy({
        usernameField: 'username',
    }, (username, password, done) => {
        console.log(username);
        console.log(password);
    })
);

export default strategy;