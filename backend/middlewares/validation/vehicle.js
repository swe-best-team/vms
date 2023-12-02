const { checkRequiredString, checkRequiredDecimal, checkRequiredID } = require('.')

exports.valCreate = [
    checkRequiredString('brand'),

    checkRequiredString('model'),

    checkRequiredDecimal('capacity'),

    checkRequiredDecimal('year')
]

exports.valCreateAdmin = [
    ...this.valCreate,

    checkRequiredID('driver')
]