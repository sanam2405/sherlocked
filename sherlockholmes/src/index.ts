require('dotenv').config()
import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoDB from './db'
import globalCatch from './middlewares/globalCatch'
import {
	registerRouter,
	loginRouter,
	answerRouter,
	flirtRouter,
	userRouter,
} from './routes'

const app = express()
const PORT: string | number = process.env.PORT || 5004

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(globalCatch)

app.get('/', (_req: Request, res: Response) => {
	res.send(`<pre> <i> A race against time to observe, decipher and unveil a mysterious case </i>  </pre>
	<pre> ~ Built with &#x1F499 by sanam </pre>`)
})

app.use(registerRouter)
app.use(loginRouter)
app.use(answerRouter)
app.use(flirtRouter)
app.use(userRouter)

app.use(globalCatch)

mongoDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`)
	})
})
