const { Vehicle, Fueling } = require('../models')
const { resError } = require('../utils')

exports.create = async (req, res) => {
    const { vehicle } = req.body

    const vehicleFile = await Vehicle.findById(vehicle)
        if (!vehicleFile)
            return resError(res, 'Vehicle not found')

    const user = req.user // from middleware/validation/user.isLoggedIn()
    const { date, station, volume, cost, proof } = req.body
    const fields = { date, station, volume, cost, proof }

    const fueling = await Fueling({
        vehicle: vehicleFile._id,
        fueler: user._id,
        ...fields
    })

    return fueling.save().then(() => {
        console.log(`${user.email} has fueled ${vehicleFile.brand} ${vehicleFile.model}`)

        return res.json({
            success: true
        })
    }).catch(() => resError(res, `Failed to fuel ${vehicleFile.brand} ${vehicleFile.model} by ${user.email}`))
}