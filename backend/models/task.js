const { Schema, SchemaTypes, model } = require('mongoose')

const taskSchema = Schema({
    provider: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    executor: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: SchemaTypes.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Task', taskSchema)