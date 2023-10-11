const { Router } = require('express')

const router = Router()

router.get('/get', (req, res) => { res.send('Hey it\'s the get route!') })

module.exports = router