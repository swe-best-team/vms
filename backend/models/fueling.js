const { Schema, SchemaTypes, model } = require('mongoose')

const fileSchema = Schema({
    filename: {type: String, required: true},
    file: {data: Buffer,
        contentType: String}
})

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
    proof: {
        type: fileSchema,
    },
// optional
})

module.exports = model('Fueling', fuelingSchema)