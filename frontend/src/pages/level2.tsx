import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/level1.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import FlashText from '../components/FlashText'
import { TIME_TO_HINT } from '../constants'

const Level3 = () => {
	const navigate = useNavigate()

	const [answer, setAnswer] = useState('')
	const [currentLevel, setCurrentLevel] = useState(0)
	const isLoggedIn = localStorage.getItem('isLoggedIn') || false

	const hiddenStyle = {
		display: 'none',
	}

	const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

	const postData = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/answer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
				body: JSON.stringify({
					username: localStorage.getItem('user'),
					level: 2,
					flag: answer,
				}),
			})
			const { status } = response
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const jsonData = await response.json()
			if (status === HttpStatusCode.OK) {
				navigate('/level-3') // Navigate to the next level
			} else {
				alert(jsonData.message)
			}
		} catch (error) {
			console.log(error)
			// notifyB('Enter valid login details...')
		}
	}

	const getUserDetails = async () => {
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/user`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
				body: JSON.stringify({
					username: localStorage.getItem('user'),
				}),
			})

			const { status } = response
			const jsonData = await response.json()

			if (status === HttpStatusCode.OK) {
				setCurrentLevel(jsonData.level)
			} else {
				navigate('/error-page')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getHint = async () => {
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/hint`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
				body: JSON.stringify({
					level: 2,
				}),
			})
			const { status } = response
			const jsonData = await response.json()
			if (status === HttpStatusCode.OK) {
				alert(jsonData.hint)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		// get the user details from db
		getUserDetails()

		const hintTime = setTimeout(getHint, TIME_TO_HINT)

		return () => clearInterval(hintTime)
	}, [])

	return (
		<>
			{isLoggedIn === 'true' && currentLevel >= 1 ? (
				<div className='l1-container'>
					{/* this is the hidden div */}
					<div style={hiddenStyle}>Hello</div>

					{/* This para should have been hidden */}
					<p className='description'>
						Now Abhishek is in his second year of college and Mia accepted his
						proposal. So he starts sending messages and POSTS to Mia. But Mia
						uses her mother’s mobile. Since Mia hasn’t saved Abhishekh’s
						contacts in her mother’s mobile, she confirms Abhishek’s
						authenticity by the use of a token and a secret key only known to
						her. Moreover, to have better chances of getting an authentic
						communication protocol, he makes reference to a particular message
						that only both of them knew :<br></br>
						Oops the message sank into this page
						<span style={{ display: 'none' }}>
							"What a fine day it was when we met for the first time" Send her a
							"msg" : "I love you Mia"
						</span>
					</p>
					<form onSubmit={event => postData(event)} className='form'>
						<input
							type='text'
							value={answer}
							placeholder='sherlocked{flag}'
							onChange={e => setAnswer(e.target.value)}
							className='input-box'
						/>
						<button type='submit' className='submit-button'>
							Submit
						</button>
					</form>
					<FlashText text='h' />
				</div>
			) : (
				<div></div>
			)}
		</>
	)
}

export default Level3
