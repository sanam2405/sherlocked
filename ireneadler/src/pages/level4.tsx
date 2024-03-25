import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/level3.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import { TIME_TO_HINT } from '../constants'
import Loader from '../components/Loader'

const Level4 = () => {
	const navigate = useNavigate()

	const [answer, setAnswer] = useState('')
	const [currentLevel, setCurrentLevel] = useState(0)
	const isLoggedIn = localStorage.getItem('isLoggedIn') || false

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
					level: 4,
					flag: answer,
				}),
			})
			const { status } = response
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const jsonData = await response.json()
			if (status === HttpStatusCode.OK) {
				navigate('/congratulations') // Navigate to the next level
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
					level: 4,
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
			{isLoggedIn === 'true' && currentLevel >= 3 ? (
				<div className='l3-container'>
					<p className='description'>
						Mia’s parents are away from home and she has called Abhishek to come
						over for Netflix and chill. She has sent him the following audio
						clip to get to her home.
						{/* </p> */}
						<br></br>
						<br></br>
						<audio controls>
							<source src='/secretaudio.mp3' type='audio/mp3' />
							Your browser does not support the audio element.
						</audio>
						<br></br>
						{/* <p className="description"> */}
						Moreover, Mia is a Thala (MS Dhoni) fan so she has shortened her
						address into a bit.ly link and sent it to Abhishek to help him reach
						there. <br></br>
						<br></br>Once reaching her home, Abhishekh gets to know about a
						really dark history about Mia. He gets to see her hidden diary. On
						turning through the pages, he gets to know about Mia’s ex and her
						entries about her past relationship. Mia always used to mention
						about a special date to Abhishek and it might just turn out to be
						the date where she broke up with her ex. Being a possessive
						boyfriend, he wants to know on which date Mia broke up?
					</p>

					<form onSubmit={event => postData(event)} className='form'>
						<input
							type='text'
							value={answer}
							placeholder='sherlocked{24052001}'
							onChange={e => setAnswer(e.target.value)}
							className='input-box'
						/>
						<button type='submit' className='submit-button'>
							Submit
						</button>
					</form>
					{/* <FlashText text="H" /> */}
				</div>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Level4
