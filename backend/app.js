const express = require('express')
require('./database')

const routers = require('./routers')

const app = express()
const port = 3000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    next()
})

// saves in req.body data of request body*
app.use(express.json())

app.use('/user', routers.user)
app.use('/vehicle', routers.vehicle)
app.use('/fueling', routers.fueling)
app.use('/task', routers.task)
app.use('/maintenance', routers.maintenance)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the vms server!</h1>')
})

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
})