const { Router } = require('express')

const { create, remove } = require('../controllers/vehicle')
const { checkVal, checkRemove } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/vehicle')
const { isLoggedIn, isDriver } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isDriver, create)
router.delete('/remove', checkRemove, isLoggedIn, isDriver, remove)

module.exports = router