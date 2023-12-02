const { Schema, SchemaTypes, model } = require('mongoose')

const vehicleSchema = Schema({
    driver: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

module.exports = model('Vehicle', vehicleSchema)