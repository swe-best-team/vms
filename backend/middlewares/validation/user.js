const { check } = require('express-validator')
const { checkRequiredString } = require('.')

const { ROLES, ROLENAMES } = require('../../utils/constants')

exports.valEmail = [
    check('email').normalizeEmail().isEmail().withMessage('The Email format is wrong')
]

exports.valCreate = [
    checkRequiredString('role').custom((role, { req }) => {
        const { license } = req.body
        if (ROLES.includes(role)) {
            if (role === ROLENAMES.driver)
                if (!license || license.length == 0)
                    throw new Error('License is required for a driver role')
            return true
        }
        throw new Error('Invalid role')
    }),

    checkRequiredString('email')
        .normalizeEmail().isEmail().withMessage('The email format is wrong'),

    checkRequiredString('password').isLength({ min: 8 }).withMessage('Password has to contain 8 characters at least'),

    checkRequiredString('confirmPassword')
        .custom(
            (value, { req }) => value == req.body.password
        ).withMessage('The passwords do not match'),

    checkRequiredString('name')
        .isLength({ min: 1, max: 20 }).withMessage('Name has to contain 1 to 20 characters'),

    checkRequiredString('surname')
        .isLength({ min: 1, max: 20 }).withMessage('Surname has to contain 1 to 20 characters'),
]

exports.valLogin = [
    check('email').normalizeEmail().isEmail().withMessage('Wrong credentials'),

    check('password').trim().not().isEmpty().withMessage('Wrong credentials')
]
