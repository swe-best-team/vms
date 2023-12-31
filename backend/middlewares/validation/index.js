const { check, validationResult } = require('express-validator')
const { Types } = require('mongoose')

const { resError } = require('../../utils')

exports.checkVal = (req, res, next) => {
    const valRes = validationResult(req)

    if (!valRes.isEmpty())
        return resError(res, valRes.errors[0].msg)

    console.log(`A request on ${req.originalUrl} successfully validated`)
    return next()

}

exports.checkId = (req, res, next) => {
    const { id } = req.body
    if (!id) return resError(res, 'The id field is required')

    if (!Types.ObjectId.isValid(id))
        return resError(res, 'The id field must be a valid Mongo Object ID')

    console.log(`A request on ${req.originalUrl} successfully validated`)
    return next()
}

exports.checkRequiredArray = fieldname => this.checkRequired(fieldname)
    .custom(array => Array.isArray(array) && array.length > 0)
    .withMessage(`The ${fieldname} field has to be a non-empty array`)

exports.checkRequiredID = fieldname => this.checkRequiredString(fieldname)
    .custom(id => Types.ObjectId.isValid(id))
    .withMessage(`The ${fieldname} field must be a valid Mongo Object ID`)

exports.checkRequiredString = fieldname => this.checkRequired(fieldname)
    .trim().notEmpty().withMessage(`The ${fieldname} field cannot be empty`)
    .isString().withMessage(`The ${fieldname} field has to be a string`)

exports.checkRequiredDecimal = fieldname => this.checkRequired(fieldname)
    .isDecimal().withMessage(`The ${fieldname} field has to be a number`)

exports.checkRequiredDate = fieldname => this.checkRequired(fieldname)
    .isISO8601().toDate()

exports.checkRequired = fieldname => check(fieldname)
    .exists().withMessage(`The ${fieldname} field is required`)