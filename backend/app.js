const express = require('express')
require('./database')

const userRouter = require('./routes/user')

const app = express()
const port = 3000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    next()
})

// saves in req.body data of request body*
app.use(express.json())
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the vms server!</h1>')
})

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
})