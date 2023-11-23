const { Router } = require('express')

const { create, remove, getAllByDriver } = require('../controllers/task')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/task')
const { isLoggedIn, isAdmin, isDriver } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/remove', checkId, isLoggedIn, isAdmin, remove)
router.post('/get/all', isLoggedIn, isDriver, getAllByDriver)

module.exports = router