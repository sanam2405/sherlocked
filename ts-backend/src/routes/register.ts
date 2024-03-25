require('dotenv').config()
import express from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from "../models/user"
import HttpStatusCode from "../constants/HttpStatusCodes"

const registerRouter = express.Router()

registerRouter.post('/register', async (req, res) => {
	try {
        if(!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not present in .env")
            return;
        }
        
		const { username, password } = req.body

		if (!(username && password)) {
			return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'All fields are required...' })
		}

		const exists = await User.findOne({ username })
		if (exists) {
			return res.status(HttpStatusCode.UNAUTHORIZED).json('User already exists...')
		}

		const encryptedPassword = await bcrypt.hash(password, 10)
		const completionTime = new Date().getTime()

		const user = await User.create({
			username,
			password: encryptedPassword,
			level: 0,
			completionTime,
		})

		const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
			expiresIn: '3h',
		})

		return res.status(HttpStatusCode.CREATED).json({
			_id: user._id,
			username: user.username,
			level: user.level,
			completionTime: user.completionTime,
			token,
		})
	} catch (error) {
		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ error: 'Oops our servers are down' })
	}
})

export default registerRouter