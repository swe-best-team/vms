const { Vehicle, Maintenance, Task, Fueling, User } = require('../models')
const { resError } = require('../utils')

const { removeMaintenance } = require('./maintenance')
const { removeTask } = require('./task')
const { removeFueling } = require('./fueling')

exports.create = async (req, res) => {
    const user = req.user // from middleware/validation/user.isLoggedIn()
    const { brand, model, capacity, year } = req.body
    const fields = { brand, model, capacity, year }

    const vehicle = await Vehicle({
        driver: user._id,
        ...fields
    })

    return vehicle.save().then(() => {
        console.log(`Vehicle ${brand} ${model} created by ${user.email}`)

        return res.json({
            success: true
        })
    }).catch(() => resError(res, `Failed to create ${brand} ${model} by ${user.email}`))
}

exports.remove = async (req, res) => {
    const { id } = req.body
    const { email } = req.user

    console.log(`${email} is trying remove a vehicle...`)

    const maintenances = await Maintenance.find({ vehicle: id })
    for (const { _id } of maintenances)
        try { await removeMaintenance(_id) }
        catch (err) {
            return resError(res, 'Failed to remove an attached maintenance')
        }

    const tasks = await Task.find({ vehicle: id })
    for (const { _id } of tasks)
        try { await removeTask(_id) }
        catch (err) {
            return resError(res, 'Failed to remove an attached task')
        }

    const fuelings = await Fueling.find({ vehicle: id })
    for (const { _id } of fuelings)
        try { await removeFueling(_id) }
        catch (err) {
            return resError(res, 'Failed to remove an attached fueling')
        }

    return Vehicle.findByIdAndDelete(id).then(doc => {
        const { brand, model } = doc
        console.log(`Successfully removed the vehicle of ${brand} ${model}`)

        return res.json({ success: true })
    }).catch(() => resError(res, 'Failed to remove a vehicle'))
}

exports.getAllByDriver = async (req, res) => {
    const { driverId } = req.params
    return Vehicle.find({ driver: driverId }).then(vehicles =>
        res.json({
            success: true,
            vehicles
        })).catch(() => resError(res, 'No vehicles found'))
}

exports.getAll = async (req, res) =>
    Vehicle.find().then(vehicles =>
        res.json({
            success: true,
            vehicles
        })).catch(() => resError(res, 'No vehicles found'))

exports.createAdmin = async (req, res) => {
    const user = req.user // from middleware/validation/user.isLoggedIn()

    const { driver } = req.body
    const driverFile = await User.findById(driver)
    if (!driverFile)
        return resError(res, 'Driver not found')

    const { brand, model, capacity, year } = req.body
    const fields = {
        driver: driverFile._id,
        brand, model, capacity, year
    }
    const vehicle = await Vehicle(fields)

    return vehicle.save().then(() => {
        console.log(`Vehicle ${brand} ${model} created by ${user.email}`)

        return res.json({
            success: true
        })
    }).catch(() => resError(res, `Failed to create ${brand} ${model} by ${user.email}`))
}