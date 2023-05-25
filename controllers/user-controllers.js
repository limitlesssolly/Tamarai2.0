import {body, validationResult} from "express-validator";
import users from '../models/userData.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const validateSignup = (req, res, next) => {
    const { name, pass} = req.body;
    // Empty fields
    if(!name) {
        return res.status(400).json({ msg: 'Username is required' });
    }
    if(!pass) {
        return res.status(400).json({ msg: 'Password is required' });
    }
    // validate name & password
    name.isLength({ min: 4 }).withMessage('Username must be at least 4 characters long');
    pass.isLength({ min: 7 }).withMessage('Password must be at least 7 characters long');
    pass.matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter');
    pass.matches(/[0-9]/).withMessage('Password must contain at least one number');
};

const hashPassword = (pass) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    return hashedPassword;
};

export { validateSignup, hashPassword };