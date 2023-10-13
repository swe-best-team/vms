const { check } = require('express-validator')

const { ROLES } = require('../../utils/constants')

const checkRequiredString = fieldname => check(fieldname)
    .exists().withMessage(`The ${fieldname} field is required`)
    .trim().not().isEmpty().withMessage(`The ${fieldname} field cannot be empty`)
    .isString().withMessage(`The ${fieldname} field has to be a string`)

exports.validateUserGet = [
    check('email').normalizeEmail().isEmail().withMessage('The Email format is wrong')
]

exports.validateUserCreation = [
    checkRequiredString('role').custom(role => {
        return ROLES.includes(role)
    }).withMessage('Invalid role'),
    check('email').exists().withMessage('Email is required')
        .normalizeEmail().isEmail().withMessage('The Email format is wrong')
        .isString().withMessage('Email has to be a string'),
    checkRequiredString('password').isLength({ min: 8 }).withMessage('Password has to contain 8 characters at least'),
    checkRequiredString('confirmPassword')
        .custom(
            (value, { req }) => value == req.body.password
        ).withMessage('The passwords do not match'),
    checkRequiredString('name')
        .isLength({ min: 1, max: 20 }).withMessage('Name has to contain 1 to 20 characters'),
    checkRequiredString('surname')
        .isLength({ min: 1, max: 20 }).withMessage('Surname has to contain 1 to 20 characters'),
    checkRequiredString('phone'),
    check('dob').optional().isDate().withMessage('Date of birth has to be a date')
]

exports.validateUserLogin = [
    check('email').normalizeEmail().isEmail().withMessage('aWrong credentials'),
    check('password').trim().not().isEmpty().withMessage('bWrong credentials')
]