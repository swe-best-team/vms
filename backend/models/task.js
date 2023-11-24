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

taskSchema.methods.getSafeInfo = function () {
    const { provider, vehicle, deadline, completed, _id } = this._doc
    return safeUserInfo
}

module.exports = model('Task', taskSchema)