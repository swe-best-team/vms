const { check } = require('express-validator')
const { Types } = require('mongoose')

const { checkRequiredString, checkRequiredDecimal, checkRequiredDate } = require('.')

exports.valCreate = [
    checkRequiredString('vehicle')
        .custom(id => Types.ObjectId.isValid(id))
        .withMessage('The vehicle field must be a valid Mongo Object ID'),

    checkRequiredDate('date'),

    checkRequiredString('station'),

    checkRequiredDecimal('volume'),

    checkRequiredDecimal('cost'),

    check('proof').optional()
        .isString().withMessage('The proof field has to be a string')
]