const { check } = require('express-validator')

const {
    checkRequiredString,
    checkRequiredDecimal,
    checkRequiredDate,
    checkRequiredID
} = require('.')

exports.valCreate = [
    checkRequiredID('vehicle'),

    checkRequiredString('station'),

    checkRequiredDecimal('volume'),

    checkRequiredDecimal('cost'),

    check('proof').optional()
        .isString().withMessage('The proof field has to be a string')
]