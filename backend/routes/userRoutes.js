const router = require('express').Router()
const { register, login, get } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login', login)
router.get('/:id', protect, get)

module.exports = router
