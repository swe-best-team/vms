const {
    checkRequiredArray,
    checkRequiredID,
    checkRequiredString,
    checkRequiredDecimal
} = require(".");

exports.valCreate = [
    checkRequiredID('vehicle'),

    checkRequiredArray('services'),

    checkRequiredString('services.*.title'),

    checkRequiredString('services.*.description'),

    checkRequiredDecimal('services.*.cost')
]