const { Router } = require('express')

const { create } = require('../controllers/maintenance')
const { checkVal } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/maintenance')
const { isLoggedIn, isMaintainer } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isMaintainer, create)

module.exports = router