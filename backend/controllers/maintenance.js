const {
    Vehicle,
    Maintenance,
    Service
} = require('../models')
const { resError } = require('../utils')

exports.create = async (req, res) => {
    const { vehicle } = req.body

    const vehicleFile = await Vehicle.findById(vehicle)
    if (!vehicleFile)
        return resError(res, 'Vehicle not found')

    const user = req.user // from middleware/validation/user.isLoggedIn()

    const maintenance = await Maintenance({
        maintainer: user._id,
        vehicle: vehicleFile._id
    })
    let maintenanceFile
    try {
        const doc = await maintenance.save()
        maintenanceFile = doc

        console.log(`${user.email} has maintained ${vehicleFile.brand} ${vehicleFile.model}`)
    } catch (err) {
        return resError(res, `Failed to maintain ${vehicleFile.brand} ${vehicleFile.model} by ${user.email}`)
    }

    const { services } = req.body
    for (const service of services) {
        const data = {
            maintenance: maintenanceFile._id,
            ...service
        }
        const serviceFile = await Service(data)
        await serviceFile.save()
            .then(({ title }) => {
                console.log(`Service ${title} created successfully`)
            })
            .catch(() =>
                resError(res, `Failed to save service ${title}`)
            )
    }

    return res.json({
        success: true
    })
}

exports.getAllByMaintainer = async (req, res) => {
    const { maintainerId } = req.params
    return Maintenance.find({ maintainer: maintainerId }).then(maintainers =>
        res.json({
            success: true,
            maintainers
        })).catch(() => resError(res, 'No maintainer found'))
}

exports.remove = async (req, res) => {
    const { id } = req.body
    const { email } = req.user

    console.log(`${email} is trying to remove a maintenance...`)

    try { await this.removeMaintenance(id) }
    catch (err) { return resError(res, err.msg) }

    return res.json({ success: true })
}

exports.removeMaintenance = async id => {
    try {
        await Service.deleteMany({ maintenance: id })
        console.log('All the attached services are removed')
    } catch (err) {
        throw new Error('Failed to remove the attached services')
    }

    try {
        const { date } = await Maintenance.findByIdAndDelete(id)
        console.log(`Successfully remove the maintenance of ${date}`)
    } catch (err) {
        throw new Error('Failed to remove a maintenance')
    }
}