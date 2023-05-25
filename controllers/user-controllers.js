import {body, validationResult} from "express-validator";
import users from '../models/userData.js';

const validation = [
    body('name').notEmpty().withMessage('Username is required')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('pass')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 7 }).withMessage('Password must be at least 7 characters long')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
];

const login = async (req, res, next) => {
    var username = req.body.name;
    var pass = req.body.pass;
    // find this username and password in database
    const users = await users.find({});
    for (var i = 0; i < users.length; i++) {
        if(users[i].name == un) {
        }
    }
}