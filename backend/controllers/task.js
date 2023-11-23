const { User, Vehicle, Task, Route } = require('../models')
const { resError } = require('../utils')

exports.create = async (req, res) => {
    const { executor, vehicle } = req.body

    const executorFile = await User.findById(executor)
    if (!executorFile)
        return resError(res, 'Executor not found')

    const vehicleFile = await Vehicle.findById(vehicle)
    if (!vehicleFile)
        return resError(res, 'Vehicle not found')

    if (vehicleFile.driver.toString() !== executorFile._id.toString()) {
        return resError(res, 'The specified vehicle does not belong to the provided driver.');
    }

    const user = req.user // from middleware/validation/user.isLoggedIn()
    const { deadline } = req.body

    const task = await Task({
        provider: user._id,
        executor: executorFile._id,
        vehicle: vehicleFile._id,
        deadline
    })
    let taskFile
    try {
        const doc = await task.save()
        taskFile = doc

        console.log(`${user.email} has assigned a task ${executor.email}`)
    } catch (err) {
        return resError(res, `Failed to assign a task to ${executorFile.email} by ${user.email}`)
    }

    const { routes } = req.body
    await routes.map(async loc => {
        const data = {
            task: taskFile._id,
            locations: loc
        }
        const routeFile = await Route(data)
        await routeFile.save()
            .then(() => console.log('A route successfully created'))
            .catch(() => {
                resError(res, 'Failed to create a route')
            })
    })

    return res.json({
        success: true
    })
}