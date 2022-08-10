const router = require('express').Router()
const { register, login, get } = require('../controllers/userController')

router.post('/', register)
router.post('/login', login)
router.get('/:id', get)

module.exports = router
