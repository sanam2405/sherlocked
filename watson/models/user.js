const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		default: null,
	},
	level: {
		type: Number,
		default: -1,
	},
	completionTime: {
		type: Number,
		default: null,
	},
})

module.exports = mongoose.model('user', userSchema)
