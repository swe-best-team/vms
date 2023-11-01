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
    await services.map(async service => {
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
    })

    return res.json({
        success: true
    })
}