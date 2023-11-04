const { Router } = require('express')

const {
    getAll,
    getByEmail,
    create,
    remove,
    login,
    logout,
    authenticate
} = require('../controllers/user')
const { checkVal, checkRemove } = require('../middlewares/validation')
const {
    valEmail,
    valCreate,
    valLogin
} = require('../middlewares/validation/user')
const { isLoggedIn, isAdmin } = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all', getAll)
router.get('/get/email', valEmail, checkVal, getByEmail)

router.put('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/remove', checkRemove, isLoggedIn, isAdmin, remove)
router.post('/login', valLogin, checkVal, login)
router.post('/logout', isLoggedIn, logout)
router.post('/authenticate', isLoggedIn, authenticate)

module.exports = router