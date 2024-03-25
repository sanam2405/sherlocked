require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import HttpStatusCode from '../constants/HttpStatusCodes'

const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
	try {
		if (!process.env.JWT_SECRET) {
			console.error('JWT_SECRET is not present in .env')
			return
		}

		const { username, password } = req.body
		if (!(username && password)) {
			return res.status(400).json({ message: 'All fields are required...' })
		}

		const user = await User.findOne({ username })

		if (!user)
			return res
				.status(HttpStatusCode.NOT_FOUND)
				.json({ message: 'User not found' })

		const check = await bcrypt.compare(password, user.password)
		if (!check)
			return res
				.status(HttpStatusCode.UNAUTHORIZED)
				.json({ message: 'Wrong password' })

		const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
			expiresIn: '3h',
		})

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			level: user.level,
			completionTime: user.completionTime,
			token,
		})
	} catch (error) {
		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: 'login error' })
	}
})

export default loginRouter
