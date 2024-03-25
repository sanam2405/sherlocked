require('dotenv').config()
import express from "express"
import HttpStatusCode from "../constants/HttpStatusCodes"
import auth from "../middlewares/auth"
import User from "../models/user"

const userRouter = express.Router()

userRouter.post('/user', auth, async (req, res) => {
	try {
		const { username } = req.body

		const user = await User.findOne({ username })

		if (!user) return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' })

		return res.status(HttpStatusCode.OK).json({ level: user.level })
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
	}
})

export default userRouter