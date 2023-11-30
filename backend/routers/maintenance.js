const { Router } = require('express')

const { create, remove, getAllByMaintainer} = require('../controllers/maintenance')
const { checkVal, checkId } = require('../middlewares/validation')
const { valCreate } = require('../middlewares/validation/maintenance')
const { isLoggedIn, isMaintainer } = require('../middlewares/verification/user')
// const {getAllByMaintenanceId} = require("../controllers/maintenance");

const router = Router()

router.get('/get/all/:maintainerId', getAllByMaintainer)
router.post('/create', valCreate, checkVal, isLoggedIn, isMaintainer, create)
router.delete('/remove', checkId, isLoggedIn, isMaintainer, remove)

module.exports = router