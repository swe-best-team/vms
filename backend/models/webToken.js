const { Schema, SchemaTypes, model } = require('mongoose')

const webTokenSchema = Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('WebToken', webTokenSchema)