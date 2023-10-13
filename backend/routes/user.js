const { Router } = require('express')

const {
    getAllUsers,
    getUserByEmail,
    userCreate,
    userDelete,
    userLogin,
    userLogout,
    userAuthenticate
} = require('../controllers/user')
const { checkValidation, validateDeletion } = require('../middlewares/validation')
const {
    validateUserGet,
    validateUserCreation,
    validateUserLogin
} = require('../middlewares/validation/user')
const { isLoggedIn, isAdmin } = require('../middlewares/verification/user')

const router = Router()

router.get('/get/all', getAllUsers)
router.get('/get/email', validateUserGet, checkValidation, getUserByEmail)
router.get('/get', (req, res) => { res.send('Hey it\'s the get route!') })

router.put('/create', validateUserCreation, checkValidation, isLoggedIn, isAdmin, userCreate)
router.delete('/delete', validateDeletion, checkValidation, isLoggedIn, isAdmin, userDelete)
router.post('/login', validateUserLogin, checkValidation, userLogin)
router.post('/logout', isLoggedIn, userLogout)
router.post('/authenticate', isLoggedIn, userAuthenticate)

module.exports = router