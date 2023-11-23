const { Router } = require('express')

const { create, remove } = require('../controllers/maintenance')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/maintenance')
const { isLoggedIn, isMaintainer } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isMaintainer, create)
router.delete('/remove', checkId, isLoggedIn, isMaintainer, remove)

module.exports = router