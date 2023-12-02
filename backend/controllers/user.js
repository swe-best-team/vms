require('dotenv').config() // for process.env

const jwt = require('jsonwebtoken')
const PDFDocument = require('pdfkit');
const ds = require('fs')
const path = require('path');
// const Chart = require('chart.js')
const { User, WebToken, Service, Maintenance, Fueling, Task, Route, Vehicle } = require('../models')

const { resError, calculateDistance } = require('../utils')
const { ROLENAMES } = require('../utils/constants')

const { JWT_TOKEN_SECRET } = process.env



exports.getAll = async (req, res) =>
    await User.find()
        .then(users => {
            const safeUserInfos = users.map(user => user.getSafeInfo())
            return res.json({
                success: true,
                users: safeUserInfos
            })
        }).catch(() => resError(res, 'No users found'))

exports.getAllDrivers = async (req, res) =>
    await User.find({ role: ROLENAMES.driver })
        .then(drivers => {
            const safeUserInfos = drivers.map(user => user.getSafeInfo())
            return res.json({
                success: true,
                drivers: safeUserInfos
            })
        }).catch(() => resError(res, 'No drivers found'))

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
        return resError(res, 'The email is already taken')

    const { role, name, surname, password, ...rest } = req.body
    let fields = { role, email, name, surname, password }

    if (role == ROLENAMES.driver && rest.license) {
        const license = rest.license
        const licensedUser = await User.findOne({ license })

        if (licensedUser) return resError(res, 'The license is already taken')
        fields.license = license
    }

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

exports.remove = async (req, res) => {
    const { id } = req.body

    return User.findByIdAndDelete(id).then(doc => {
        const { email } = doc
        console.error(`User ${email} is removed from the DB`)

        return res.json({ success: true })
    }).catch(() => resError(res, 'Failed to delete the user'))
}

exports.generateReport = async (req, res) => {
    const user = req.user // from middlewares/validation/user.isLoggedIn()
    const { driver } = req.body

    const tasks = await Task.find({ executor: driver })
    if (tasks.length === 0)
        return resError(res, 'No tasks assigned to the driver')

    let totalDistance = 0;
    let routeDistances = {};
    index = 1;
    for (const task of tasks) {
            console.log(task)
        const routes = await Route.find()
        routes.forEach(route => {
            const { start, end } = route.locations;
            const routeDistance = calculateDistance(start.latitude, start.longitude, end.latitude, end.longitude);
            totalDistance += routeDistance

            const routeName = `route${index++}`;
            routeDistances[routeName] = routeDistance;
        });
    }

    routeDistances['TotalDistance'] = totalDistance;
    index = 1;
    findex = 1;
    const vehicles = await Vehicle.find({ driver });
    let spendings = [];
    let maintenanceSpendings = {};
    let fuelcost = [];
    let fuelingSpendings = {};
    let totalSpent = 0;
    let fuelspent = 0;
    await Promise.all(vehicles.map(async vehicle => {
        console.log(vehicles)
        const maintenanceData = await Maintenance.find({ vehicle: vehicle })
        console.log(maintenanceData)
        await maintenanceData.map(async m => {
            const services = await Service.find({ maintenance: m });
            services.map(service => {
                const serviceRoute = `serviceRoute${index++}`;
                console.log(service.cost)
                maintenanceSpendings[serviceRoute] = service.cost;
                totalSpent += service.cost;
            })
        })
        
        spendings.push(totalSpent);
        
        const fuelingData = await Fueling.find({ vehicle: vehicle })
        await fuelingData.map(async f => {
            const fuelingRoute = `fuelingRoute${findex++}`;
            fuelingSpendings[fuelingRoute] = f.cost;
            fuelspent += f.cost;
        })
        
        fuelcost.push(fuelspent);
    }))
    maintenanceSpendings['TotalMaintenance'] = totalSpent;
    fuelingSpendings['TotalFueling'] = fuelspent;
    console.log(maintenanceSpendings);
    console.log(fuelingSpendings);

    const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
    const PDFDocument = require('pdfkit');
    const fs = require('fs');
    
    const width = 800; // Width of the chart
    const height = 600; // Height of the chart

    const routeLabels = Object.keys(routeDistances)
    const routeDistancesArray = Object.values(routeDistances)
    
    const distanceChartOptions = {
      type: 'bar',
      data: {
        labels: routeLabels,
        datasets: [{
          label: 'Distance covered by each route',
          data: routeDistancesArray,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    };
    
    const maintenanceLabels = Object.keys(maintenanceSpendings)
    const maintenanceArray = Object.values(maintenanceSpendings)
    const maintenanceChartOptions = {
        type: 'bar',
        data: {
          labels: maintenanceLabels,
          datasets: [{
            label: 'Maintenance cost at each vehicle',
            data: maintenanceArray,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      };

      const fuelingLabels = Object.keys(fuelingSpendings)
      const fuelingArray = Object.values(fuelingSpendings)
      const fuelingChartOptions = {
          type: 'bar',
          data: {
            labels: fuelingLabels,
            datasets: [{
              label: 'Fueling cost at each vehicle',
              data: fuelingArray,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: true
              }
            }
          }
        };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    
    (async () => {
      // Create chart as a buffer
      const distanceBuffer = await chartJSNodeCanvas.renderToBuffer(distanceChartOptions);
      const maintenanceBuffer = await chartJSNodeCanvas.renderToBuffer(maintenanceChartOptions);
      const fuelingBuffer = await chartJSNodeCanvas.renderToBuffer(fuelingChartOptions);
    
      // Create a PDF document
      const doc = new PDFDocument({ size: [width, height] });
      const stream = fs.createWriteStream('driversDistanceChart.pdf');
      doc.pipe(stream);
    
      // Embed the chart image into the PDF
      doc.image(distanceBuffer, 0, 0, { width, height });
      doc.addPage();
      doc.image(maintenanceBuffer, 0, 0, { width, height });
      doc.addPage();
      doc.image(fuelingBuffer, 0, 0, { width, height });
    
      // Finalize the PDF and end the stream
      doc.end();
    })();

    try {
        // const pdfPath = await exports.generateReport();
        file = await res.sendFile(path.join(__dirname,'..', 'driversDistanceChart.pdf'));
        return file;
    } catch (error) {
        console.error(error);
        return resError(res, 'Error generating pdf')
    }
}