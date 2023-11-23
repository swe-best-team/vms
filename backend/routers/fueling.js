    const { Router } = require('express')

const { create } = require('../controllers/fueling')
const { checkVal } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/fueling')
const { isLoggedIn, isFueler } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isFueler, create)

module.exports = router