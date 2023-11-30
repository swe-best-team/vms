const { Router } = require('express')

const {
    get,
    create, remove,
    getAllByDriver, getCurrentByDriver,
    removeAll, updateRoute
} = require('../controllers/task')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/task')
const { isLoggedIn, isAdmin, isDriver } = require('../middlewares/verification/user')

const router = Router()

router.get('/get/:taskId', get)
router.post('/create', valCreate, checkVal, isLoggedIn, isAdmin, create)
router.delete('/remove', checkId, isLoggedIn, isAdmin, remove)
router.delete('/remove/all', isLoggedIn, isAdmin, removeAll)
router.post('/get/all', isLoggedIn, isDriver, getAllByDriver)
router.post('/get/current', isLoggedIn, isDriver, getCurrentByDriver)
router.put('/updateroute', updateRoute)
module.exports = router