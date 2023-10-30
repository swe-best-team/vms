const { checkRequiredString, checkRequiredDecimal } = require('.')

exports.valCreate = [
    checkRequiredString('brand'),

    checkRequiredString('model'),

    checkRequiredDecimal('capacity'),

    checkRequiredDecimal('year')
]