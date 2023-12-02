const { Schema, SchemaTypes, model } = require('mongoose')

const serviceSchema = Schema({
    maintenance: {
        type: SchemaTypes.ObjectId,
        ref: 'Maintenance',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String, // optional
    cost: {
        type: Number,
        required: true
    }
})

module.exports = model('Service', serviceSchema)