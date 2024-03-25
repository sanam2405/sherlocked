import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/level2.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import FlashText from '../components/FlashText'
import { TIME_TO_HINT } from '../constants'
import Loader from '../components/Loader'

const Level3 = () => {
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
					level: 3,
					flag: answer,
				}),
			})
			const { status } = response
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const jsonData = await response.json()
			if (status === HttpStatusCode.OK) {
				navigate('/level-4') // Navigate to the next level
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
				console.log('JSON DATA', jsonData)
				console.log('JSON DATA LEVEL', jsonData.level)
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
					level: 3,
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

	useEffect(() => {
		console.log('Current level ', currentLevel)
	}, [currentLevel])

	interface BoldCharProps {
		char: string
	}

	const BoldChar: React.FC<BoldCharProps> = ({ char }) => {
		return (
			<>
				<span style={{ fontWeight: 'bold', color: 'red' }}>{char}</span>
			</>
		)
	}

	return (
		<>
			{isLoggedIn === 'true' && currentLevel >= 2 ? (
				<div className='l2-container'>
					<p className='description'>
						Spending too much time on Rabindra Sarovar with Mia, Abhishek now
						realizes that he is not prepared for placements. So he starts to
						upskill his development skills. He starts watching YouTube tutorials
						and demonstrations but is unable to make a good project. Eventually
						after trying a lot, he decides to use the most secretive and
						effective power that we all engineers have. Cmd / Ctrl + C and Cmd /
						Ctrl + V <br /> So he digs up GitHub to explore and get inspired by
						some open source projects and level up his resume. While crawling
						the nooks and corners, he stumbled upon a curious message within a
						project's README.md file:
						<br></br>
						codes = 205,190,31,194,127,215,147,15,98,186,109,194,37,20 Eager to
						unravel the mystery? Decrypt me! The <BoldChar char='221' />
						st commit was <BoldChar char='verified' /> at <BoldChar char='11' />{' '}
						PM.
						<br></br>
						Can you help Abhishek to unveil the secrets of the project.
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
					<FlashText text='u' />
				</div>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Level3
