require('dotenv').config()
import express from "express"
import jwt from 'jsonwebtoken'
import HttpStatusCode from "../constants/HttpStatusCodes"

const flirtRouter = express.Router()

flirtRouter.post('/flirt', (req, res) => {
	try {
		if(!process.env.REVERSE_JWT_SECRET) {
            console.error("REVERSE_JWT_SECRET is not present in .env")
            return;
        }
		const { token } = req.body

		const verify = jwt.verify(token, process.env.REVERSE_JWT_SECRET)


		if (verify) {
			return res.status(HttpStatusCode.OK).json({ hibrewFlag: 'YmlyaXlhbmlNb25zdGVy' })
		} else {
			return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Couldn't get it..." })
		}
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
	}
})

export default flirtRouter