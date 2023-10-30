const { Schema, SchemaTypes, model } = require('mongoose')

const fuelingSchema = Schema({
    vehicle: {
        type: SchemaTypes.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    fueler: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    station: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    proof: String // optional
})

module.exports = model('Fueling', fuelingSchema)