require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const verifyToken = require('./middleware/verifyToken')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const ANS = [
	process.env.LEVEL_1,
	process.env.LEVEL_2,
	process.env.LEVEL_3,
	process.env.LEVEL_4,
]

// console.log(ANS);

const HINTS = [
	'1. See all the capital letters.\n',
	'1. POST request to /flirt route',
	'1. GitHub commits are verified.\n',
	'1. BS',
]

app.get('/', (req, res) => {
	return res.json('Server is running')
})

app.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body

		if (!(username && password)) {
			return res.status(400).json({ message: 'All fields are required...' })
		}

		const exists = await User.findOne({ username })
		if (exists) {
			return res.status(401).json('User already exists...')
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

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			level: user.level,
			completionTime: user.completionTime,
			token,
		})
	} catch (error) {
		return res
			.status(500)
			.json({ error: err.message, message: 'register error' })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		if (!(username && password)) {
			return res.status(400).json({ message: 'All fields are required...' })
		}

		const user = await User.findOne({ username })

		if (!user) return res.status(404).json({ message: 'User not found' })

		const check = await bcrypt.compare(password, user.password)
		if (!check) return res.status(401).json({ message: 'Wrong password' })

		const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
			expiresIn: '3h',
		})

		// const options = {
		//   // expires: new Date(Date.now() + )
		// }

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			level: user.level,
			completionTime: user.completionTime,
			token,
		})
	} catch (error) {
		return res.status(500).json({ message: 'login error' })
	}
})

app.post('/answer', verifyToken, async (req, res) => {
	// authorization
	try {
		const { username, level, flag } = req.body

		if (level > 4 || flag.trim() !== 'sherlocked{' + ANS[level - 1] + '}') {
			// console.log(typeof('sherlocked{' + ANS[level - 1] + '}'));
			// console.log(typeof(flag));
			return res.status(403).json({ message: 'Wrong answer...' })
		}

		const user = await User.findOne({ username })

		if (!user) return res.status(404).json({ message: 'User not found' })

		if (user.level < level - 1)
			return res.status(401).json({ message: 'Unauthorized...' })

		user.level = Math.min(level, 4)
		user.completionTime = new Date().getTime()

		await user.save()

		// console.log(req.user);
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

app.post('/hint', verifyToken, (req, res) => {
	try {
		const { level } = req.body
		if (level > 4) return res.status(404).json({ message: 'Level not found' })

		return res.status(200).json({ hint: HINTS[level - 1] })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

app.post('/user', verifyToken, async (req, res) => {
	try {
		const { username } = req.body

		const user = await User.findOne({ username })

		if (!user) return res.status(404).json({ message: 'User not found' })

		return res.status(200).json({ level: user.level })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

app.post('/flirt', (req, res) => {
	try {
		const { token } = req.body

		const verify = jwt.verify(token, process.env.REVERSE_JWT_SECRET)

		// console.log(generatedToken);

		if (verify) {
			return res.status(200).json({ hibrewFlag: 'YmlyaXlhbmlNb25zdGVy' })
		} else {
			return res.status(400).json({ message: "Couldn't get it..." })
		}
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

const PORT = process.env.PORT || 5004

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Connected to MongoDB")
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`)
		})
	})
	.catch(error => console.log(`Could not connect to MongoDB ${error}`))
