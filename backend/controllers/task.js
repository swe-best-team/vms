const { User, Vehicle, Task, Route } = require('../models')
const { resError } = require('../utils')

const { ROLENAMES } = require('../utils/constants')

exports.create = async (req, res) => {
    const { executor, vehicle } = req.body

    const executorFile = await User.findById(executor)
    if (!executorFile)
        return resError(res, 'Executor not found')
    if (executorFile.role != ROLENAMES.driver)
        return resError(res, 'The executor has to be a driver')

    const vehicleFile = await Vehicle.findById(vehicle)
    if (!vehicleFile)
        return resError(res, 'Vehicle not found')
    console.log(executorFile._id, vehicleFile.driver)
    if (executorFile._id.valueOf() != vehicleFile.driver.valueOf())
        return resError(res, 'The executor does not own the vehicle')

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

        console.log(`${user.email} has assigned a task to ${executorFile.email}`)
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

exports.remove = async (req, res) => {
    const { id } = req.body
    const { email } = req.user

    console.log(`${email} is trying to remove a task...`)

    try { await this.removeTask(id) }
    catch (err) { return resError(res, err.msg) }

    return res.json({ success: true })
}

exports.removeTask = async id => {
    try {
        await Route.deleteMany({ task: id })
        console.log('All the attached routes are removed')
    } catch (err) {
        throw new Error('Failed to remove the attached routes')
    }

    try {
        const { deadline } = await Task.findByIdAndDelete(id)
        console.log(`Successfully removed the task of ${deadline}`)
    } catch (err) {
        throw new Error('Failed to remove a task')
    }
}

exports.getAllByDriver = async (req, res) => {
    const { _id } = req.user // from middlewares/validation/user.isLoggedIn()

    return await Task.find({ executor: _id })
        .then(async tasks => {
            let formattedTasks = []
            for (const t of tasks) {
                const p = await User.findById(t.provider)
                const v = await Vehicle.findById(t.vehicle)
                const doc = {
                    provider: `${p.name} ${p.surname}`,
                    vehicle: `${v.brand} ${v.model}`,
                    deadline: t.deadline,
                    completed: t.completed
                }
                formattedTasks.push(doc)
            }

            return res.json({
                success: true,
                tasks: formattedTasks
            })
        })
        .catch(err => resError(res, 'Could not get the tasks'))
}