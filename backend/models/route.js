const { Schema, SchemaTypes, model } = require('mongoose')

const locSchema = Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
})

const locationsSchema = Schema({
    start: {
        type: locSchema,
        required: true
    },
    end: {
        type: locSchema,
        required: true
    }
})

const routeSchema = Schema({
    task: {
        type: SchemaTypes.ObjectId,
        ref: 'Task',
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'canceled', 'delayed'],
        default: 'completed'
    },
    active: {
        type: Boolean,
        default: true
    },
    locations: {
        type: locationsSchema,
        required: true
    }
})

module.exports = model('Route', routeSchema)