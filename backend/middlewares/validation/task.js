const {
    checkRequired,
    checkRequiredID,
    checkRequiredDate,
    checkRequiredArray,
    checkRequiredDecimal
} = require('.')

const checkRequiredLocation = location => [
    checkRequired(location),

    checkRequiredDecimal(`${location}.longitude`)
        .custom(lon => lon >= -180 && lon <= 180)
        .withMessage(`${location}'s longitude not is invalid`),

    checkRequiredDecimal(`${location}.latitude`)
        .custom(lat => lat >= -90 && lat <= 90)
        .withMessage(`${location}'s latitude not is invalid`)
]

exports.valCreate = [
    checkRequiredID('executor'),

    checkRequiredID('vehicle'),

    checkRequiredDate('deadline'),

    checkRequiredArray('routes'),

    checkRequiredLocation('routes.*.start'),

    checkRequiredLocation('routes.*.end'),
]