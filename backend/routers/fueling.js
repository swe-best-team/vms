    const { Router } = require('express')

const { create, remove } = require('../controllers/fueling')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/fueling')
const { isLoggedIn, isFueler } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isFueler, create)
router.delete('/remove', checkId, isLoggedIn, isFueler, remove)

module.exports = router