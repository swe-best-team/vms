require('dotenv').config() // for process.env

const jwt = require('jsonwebtoken')
const PDFDocument = require('pdfkit');
const ds = require('fs')
const Chart = require('chart.js')
const { User, WebToken, Service, Maintenance, Fueling, Task,Route, Vehicle} = require('../models')

const { resError } = require('../utils')
const { ROLENAMES } = require('../utils/constants')
const {maintenance, user, vehicle} = require("../routers");

const { JWT_TOKEN_SECRET } = process.env



exports.getAll = async (req, res) =>
    await User.find()
        .then(users => {
            const safeUsersInfo = users.map(user => user.getSafeInfo())
            return res.json({
                success: true,
                users: safeUsersInfo
            })
        })
        .catch(() => resError(res, 'No users found'))

exports.getByEmail = async (req, res) => {
    const { email } = req.query
    return await User.findOne({ email })
        .then(user => {
            if (user.role != 'driver')
                return resError(res, 'No access')

            const safeUserInfo = user.getSafeUserInfo()
            return res.json({
                success: true,
                user: safeUserInfo
            })
        }).catch(() => resError(res, 'No user found'))
}

exports.create = async (req, res) => {
    const { email } = req.body
    const emailFree = await User.isEmailFree(email)
    if (!emailFree)
        return resError(res, 'Email is already taken')

    const { role, name, surname, password, ...rest } = req.body
    let fields = { role, email, name, surname, password }

    if (role == ROLENAMES.driver && rest.license)
        fields.license = rest.license

    const user = await User(fields)
    return user.save().then(() => {
        console.log(`User ${email} is created`)

        const safeUserInfo = user.getSafeInfo()
        return res.json({
            success: true,
            user: safeUserInfo
        })
    }).catch(() => resError(res, `Failed to create the user ${email}`))
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
        return resError(res, 'Wrong credentials')
    const matched = await user.comparePassword(password)
    if (!matched)
        return resError(res, 'Wrong credentials')

    await WebToken.deleteMany({ owner: user._id })
    const tokenVal = jwt.sign({ owner: user._id }, JWT_TOKEN_SECRET)
    const { iat } = jwt.verify(tokenVal, JWT_TOKEN_SECRET)
    const wToken = await WebToken({
        owner: user._id,
        token: tokenVal,
        createdAt: iat
    })

    const safeUserInfo = user.getSafeInfo()

    return await wToken.save().then(() =>
        res.json({
            success: true,
            user: safeUserInfo,
            jwtToken: tokenVal
        })).catch(() => resError(res, 'Failed to log in'))
}

exports.logout = async (req, res) => {
    const { _id } = req.user // from middlewares/validation/user.isLoggedIn()
    await WebToken.deleteMany({ owner: _id })

    return res.json({ success: true })
}

exports.authenticate = async (req, res) => {
    const user = req.user // from middlewares/validation/user.isLoggedIn()

    const safeUserInfo = user.getSafeInfo()
    return res.json({
        success: true,
        user: safeUserInfo
    })
}

exports.userDelete = async (req, res) => {
    const { _id } = req.body

    return User.findByIdAndDelete(_id).then(doc => {
        const { email } = doc
        console.error(`User ${email} is deleted from the DB`)

        return res.json({ success: true })
    }).catch(() => resError(res, 'Failed to delete the user'))
}


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

exports.generateReport = async (req, res) => {
    const user = req.user // from middlewares/validation/user.isLoggedIn()
    const { driver } = req.body

    const tasks = await Task.find({ executor: driver })
    if (tasks.length === 0)
        return resError(res, 'No tasks assigned to the driver')

    let totalDistance = 0;
    for (const task in tasks) {
        const routes = await Route.find({ status: 'completed' , active : false})
        routes.forEach(route => {
            const { start, end } = route.locations;
            totalDistance += calculateDistance(start.latitude, start.longitude, end.latitude, end.longitude);
        });
    }

    const vehicles = await Vehicle.find({driver})
    let spendings = []
    await vehicles.map(async vehicle => {
        let totalSpent = 0;
        const maintenanceData = await Maintenance.find({vehicle: driver})
        await maintenanceData.map(async m => {
            const services = await Service.find({vehicle});
            services.map(service => {
                totalSpent += service.cost;
            })
        })

        spendings.push(totalSpent);

        const fuelingData = await Fueling.find({vehicle : driver})
    })



    const doc = new PDFDocument();
    const stream = fs.createWriteStream('driver_report.pdf');
    doc.pipe(stream);

    doc.text('Driver Report for user: $f{user.name}');
    doc.text(`Total task assigned: $f{tasks.length}`);
    const MaintenanceCost = new Chart(doc, 'bar', {
        data: {
            labels: vehicles.map(item => `${item.brand} ${item.model}`),
            datasets:[{
                label: "Money spent on Maintenance",
                data: spendings,
            }],
        },
    });

    const FuelingVolume = new Chart(doc, 'bar', {
        data: {
            labels: task.map(item => item.date.toISOString()),
            datasets: [{
                label: "Amount of spent fuel",
                data: fuelingData.map(fuelingData => fuelingData.volume),
            }],
        },
    });
    doc.image(MaintenanceCost.toBase64Image(),10, 600, {width: 300});
    doc.image(FuelingVolume.toBase64Image(), 10, 600, {width: 300} );

    doc.end();
}