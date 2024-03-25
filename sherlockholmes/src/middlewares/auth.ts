import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import HttpStatusCode from '../constants/HttpStatusCodes'
import User from '../models/user'
require('dotenv').config()

const { JWT_SECRET } = process.env

interface TokenPayload {
	id: string
}
const auth = async (req: Request, res: Response, next: NextFunction) => {
	if (!process.env.JWT_SECRET) {
		console.error('JWT_SECRET is undefined. Check the .env')
		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.send({ errors: 'Internal Server Error' })
	}

	const { authorization } = req.headers
	if (!authorization)
		return res
			.status(HttpStatusCode.UNAUTHORIZED)
			.send({ error: 'Access Denied! You are not authorized' })

	const token = authorization.replace('Bearer ', '')

	try {
		const info = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
		const currUser = await User.findById(info.id)

		if (!currUser) {
			return res
				.status(HttpStatusCode.NOT_FOUND)
				.send({ errors: 'User not found' })
		}

		interface CustomRequest extends Request {
			user?: typeof currUser
		}

		;(req as CustomRequest).user = currUser

		next()
	} catch (err) {
		return res
			.status(HttpStatusCode.UNAUTHORIZED)
			.json({ error: 'You must be logged in' })
	}
}

export default auth
