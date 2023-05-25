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

