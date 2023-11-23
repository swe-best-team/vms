    const { Router } = require('express')

const {
    getAll,
    getByEmail,
    create,
    userDelete,
    login,
    logout,
    authenticate
} = require('../controllers/user')
const { checkVal, valDelete } = require('../middlewares/validation')
const {
    valEmail,
    valCreate,
    valLogin
} = require('../middlewares/validation/user')
const { isLoggedIn, isAdmin, isDriver} = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all', getAll)
router.get('/get/email', valEmail, checkVal, getByEmail)

router.put('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/delete', valDelete, checkVal, isLoggedIn, isAdmin, userDelete)
router.post('/login', valLogin, checkVal, login)
router.post('/logout', isLoggedIn, logout)
router.post('/authenticate', isLoggedIn, authenticate)
router.post('/generatereport', isisDriver())
module.exports = router