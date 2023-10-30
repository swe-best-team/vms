const { Vehicle } = require('../models')

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