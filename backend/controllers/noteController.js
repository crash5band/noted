const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

const getNotes = asyncHandler( async (req, res) => {
	const notes = await Note.find({ user: req.user.id })
	res.status(200).json(notes)
})

const createNote = asyncHandler(async (req, res) => {
	const {title, text, labels} = req.body
	if (!title && !text && !labels) {
		res.status(400)
		throw new Error('Cannot create an empty note')
	}

	const newNote = await Note.create({
		title,
		text,
		labels,
		user: req.user.id
	})
	res.status(200).json(newNote)
})

const updateNote = asyncHandler(async (req, res) => {
	const note = Note.findById(req.params.id)
	if (!note) {
		res.status(400)
		throw new Error('Note not found')
	}

	// verify the user exists
	if (!req.user) {
		res.status(400)
		throw new Error('User does not exist')
	}

	// verify the user owns this note
	if (note.user.toString() !== req.user.id) {
		res.status(400)
		throw new Error('Not authorized')
	}

	const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
	res.status(200).json(updatedNote)
})

const deleteNote = asyncHandler(async (req, res) => {
	const note = Note.findById(req.params.id)
	if (!note) {
		res.status(400)
		throw new Error('Note not found')
	}

	// verify the user exists
	if (!req.user) {
		res.status(400)
		throw new Error('User does not exist')
	}

	// verify the user owns this note
	if (note.user.toString() !== req.user.id) {
		res.status(400)
		throw new Error('Not authorized')
	}

	await Note.findByIdAndDelete(req.params.id)
	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getNotes,
	createNote,
	updateNote,
	deleteNote,
}
