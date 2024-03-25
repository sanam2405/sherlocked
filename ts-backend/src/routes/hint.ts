require('dotenv').config()
import express from "express"
import HttpStatusCode from "../constants/HttpStatusCodes"
import { HINTS } from "../constants/Hints"
import auth from "../middlewares/auth"

const hintRouter = express.Router()

hintRouter.post('/hint', auth, (req, res) => {
	try {
		const { level } = req.body
		if (level > 4) return res.status(404).json({ message: 'Level not found' })

		return res.status(HttpStatusCode.OK).json({ hint: HINTS[level - 1] })
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
	}
})


export default hintRouter