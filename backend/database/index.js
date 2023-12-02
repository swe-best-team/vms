const { connect } = require('mongoose')
require('dotenv').config() // for process.env

const { MONGO_URI } = process.env

// connecting to the MongoDB server
connect(MONGO_URI)
    .then(() => { console.log('Connected to MongoDB') })
    .catch(err => { console.error(err.message) })