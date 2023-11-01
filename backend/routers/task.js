const { Router } = require('express')

const { create } = require('../controllers/task')
const { checkVal } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/task')
const { isLoggedIn, isAdmin } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)

module.exports = router