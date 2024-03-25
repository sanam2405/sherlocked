require('dotenv').config()
import express from "express"
import jwt from 'jsonwebtoken'
import HttpStatusCode from "../constants/HttpStatusCodes"

const flirtRouter = express.Router()

flirtRouter.post('/flirt', (req, res) => {
		if(!process.env.REVERSE_JWT_SECRET) {
            console.error("REVERSE_JWT_SECRET is not present in .env")
            return;
        }

		const {authorization} = req.headers
		const { msg } = req.body

		if (!authorization) 
		return res.status(HttpStatusCode.UNAUTHORIZED).send({error: 'Access Denied! You are not authorized to flirt'})

		const token = authorization.replace('Bearer ', '')

		try {

		const verify = jwt.verify(token, process.env.REVERSE_JWT_SECRET)

		if (verify) {
			if(msg==="I love you Mia")
			return res.status(HttpStatusCode.OK).json({ hibrewFlag: 'YmlyaXlhbmlNb25zdGVy' })
			else
			return res.status(HttpStatusCode.BAD_REQUEST).json({message: "You are authorized but you did not send the correct message"})
		} else {
			return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Your Authorization token is not correct!" })
		}
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
	}
})

export default flirtRouter