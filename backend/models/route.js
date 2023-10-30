const { Schema, SchemaTypes, model } = require('mongoose')

const routeSchema = Schema({
    task: {
        type: SchemaTypes.ObjectId,
        ref: 'Task',
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'canceled', 'delayed'],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    startPoint: {
        type: [Number],
        required: true
    },
    endPoint: {
        type: [Number],
        required: true
    }
})

module.exports = model('Route', routeSchema)