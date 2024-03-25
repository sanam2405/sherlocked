require('dotenv').config()
import express from "express"
import User from "../models/user"
import HttpStatusCode from "../constants/HttpStatusCodes"
import auth from "../middlewares/auth"

import { ANS } from "../constants/Answers"

const answerRouter = express.Router()

answerRouter.post('/answer', auth, async (req, res) => {
	// authorization
	try {
		const { username, level, flag } = req.body
		if (level > 4 || flag.trim() !== 'sherlocked{' + ANS[level - 1] + '}') {
			return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Wrong answer...' })
		}

		const user = await User.findOne({ username })

		if (!user) return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' })

		if (user.level < level - 1)
			return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized...' })

		user.level = Math.min(level, 4)
		user.completionTime = new Date().getTime()

		await user.save()

		return res.status(HttpStatusCode.OK).json(user)
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
	}
})

export default answerRouter