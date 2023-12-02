const { Schema, SchemaTypes, model } = require('mongoose')

const maintenanceSchema = Schema({
    maintainer: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: SchemaTypes.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Maintenance', maintenanceSchema)