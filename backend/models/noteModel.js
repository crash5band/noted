const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Notes must contain a title']
		},
		text: {
			type: String,
			required: [true, 'Notes must contain text']
		},
		labels: {
			type: Array,
			required: false
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Note', noteSchema)
