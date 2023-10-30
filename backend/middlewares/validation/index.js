const { check, validationResult } = require('express-validator')

const { resError } = require('../../utils')

exports.checkVal = (req, res, next) => {
    const valRes = validationResult(req)

    if (!valRes.isEmpty())
        return resError(res, valRes.errors[0].msg)

    console.log(`A request on ${req.originalUrl} successfully validated`)
    return next()

}

exports.valDelete = [
    check('_id').exists().withMessage('The ID is required')
]

exports.checkRequiredString = fieldname => checkRequired(fieldname)
    .trim().notEmpty().withMessage(`The ${fieldname} field cannot be empty`)
    .isString().withMessage(`The ${fieldname} field has to be a string`)

exports.checkRequiredDecimal = fieldname => checkRequired(fieldname)
    .isDecimal().withMessage(`The ${fieldname} field has to be a number`)

exports.checkRequiredDate = fieldname => checkRequired(fieldname)
    .isISO8601().toDate()

const checkRequired = fieldname => check(fieldname)
    .exists().withMessage(`The ${fieldname} field is required`)