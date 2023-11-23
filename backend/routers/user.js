    const { Router } = require('express')

const {
    getAll,
    getByEmail,
    create,
    remove,
    login,
    logout,
    authenticate,
    getAllDrivers
} = require('../controllers/user')
const { checkVal, checkId } = require('../middlewares/validation')
const {
    valEmail,
    valCreate,
    valLogin
} = require('../middlewares/validation/user')
const { isLoggedIn, isAdmin, isDriver} = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all', getAll)
router.get('/get/all/drivers', getAllDrivers)
router.get('/get/email', valEmail, checkVal, getByEmail)

router.post('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/remove', checkId, isLoggedIn, isAdmin, remove)
router.post('/login', valLogin, checkVal, login)
router.post('/logout', isLoggedIn, logout)
router.post('/authenticate', isLoggedIn, authenticate)
router.post('/generatereport', isisDriver())
module.exports = router