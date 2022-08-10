const router = require('express').Router()
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/noteController')

router.route('/').get(getNotes).post(createNote)
router.route('/:id').delete(deleteNote).put(updateNote)

module.exports = router
