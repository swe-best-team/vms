const { Vehicle, Fueling, Maintenance} = require('../models')
const { resError } = require('../utils')

exports.create = async (req, res) => {
    const { vehicle } = req.body

    const vehicleFile = await Vehicle.findById(vehicle)
    if (!vehicleFile)
        return resError(res, 'Vehicle not found')

    const user = req.user // from middleware/validation/user.isLoggedIn()
    const { station, volume, cost, proof } = req.body
    const fields = { station, volume, cost, proof }

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

exports.getAllByFueling = async (req, res) => {
    try{
    const { fuelerId } = req.params
    const fuelers = await Fueling.find({ fueler: fuelerId });

    if (fuelers.length === 0) {
        return resError(res, 'No fuelers found');
    }
    return res.json({
        success: true,
        fuelers
    });
} catch (error) {
    return resError(res, 'Error retrieving fuelers by ID');
}
}

exports.remove = async (req, res) => {
    const { id } = req.body
    const { email } = req.user

    console.log(`${email} is trying to remove a fueling...`)

    try { this.removeFueling(id) }
    catch (err) { return resError(res, err.msg) }

    return res.json({ success: true })
}

exports.removeFueling = async id => {
    try {
        const doc = await Fueling.findByIdAndDelete(id)

        const { brand, model } = doc
        console.log(`Successfully removed the fueling of ${brand} ${model}`)
    } catch (err) {
        throw new Error('Failed to remove a fueling')
    }
}