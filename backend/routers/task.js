const { Router } = require('express')

const { create, remove } = require('../controllers/task')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/task')
const { isLoggedIn, isAdmin } = require('../middlewares/verification/user')

const router = Router()

router.post('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/remove', checkId, isLoggedIn, isAdmin, remove)

module.exports = router