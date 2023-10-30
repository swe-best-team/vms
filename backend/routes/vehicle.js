const { Router } = require('express')

const { create } = require('../controllers/vehicle')
const { checkVal } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/vehicle')
const { isLoggedIn, isDriver } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isDriver, create)

module.exports = router