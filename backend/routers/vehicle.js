const { Router } = require('express')

const {
    getAllByDriver,
    create, remove, getAll, createAdmin
} = require('../controllers/vehicle')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate, valCreateAdmin } = require('../middlewares/validation/vehicle')
const { isLoggedIn, isDriver, isAdmin } = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all', getAll)
router.get('/get/all/:driverId', getAllByDriver)

router.post('/create', valCreate, checkVal, isLoggedIn, isDriver, create)
router.post('/create/admin', valCreateAdmin, checkVal, isLoggedIn, isAdmin, createAdmin)
router.delete('/remove', checkId, isLoggedIn, isDriver, remove)

module.exports = router