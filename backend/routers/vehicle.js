const { Router } = require('express')

const { getAllByDriver, create, remove } = require('../controllers/vehicle')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/vehicle')
const { isLoggedIn, isDriver } = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all/:driverId', getAllByDriver)
router.post('/create', valCreate, checkVal, isLoggedIn, isDriver, create)
router.delete('/remove', checkId, isLoggedIn, isDriver, remove)

module.exports = router