import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/level0.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import FlashText from '../components/FlashText'
import { TIME_TO_HINT } from '../constants'
import ErrorPage from './ErrorPage'

const Level1 = () => {
	const [answer, setAnswer] = useState('')
	const [currentLevel, setCurrentLevel] = useState(0)
	const isLoggedIn = localStorage.getItem('isLoggedIn') || false

	const navigate = useNavigate()

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
					level: 1,
					flag: answer,
				}),
			})
			const { status } = response
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const jsonData = await response.json()
			if (status === HttpStatusCode.OK) {
				navigate('/level-2') // Navigate to the next level
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
					level: 1,
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
			{isLoggedIn === 'true' && currentLevel >= 0 ? (
				<div className='l0-container'>
					<p className='description'>
						<BoldChar char='W' />
						elcome to <BoldChar char='J' />
						hand <BoldChar char='U' />
						niversity. the intelligent <BoldChar char='A' />
						bhishek in his first year of college already starts thinking less
						about placements and more about the <BoldChar char='CTC' />. his
						extraordinary singing and dancing skill takes center stage at{' '}
						<BoldChar char='CSF' />
						(college ka sasta freshers). <BoldChar char='S' />
						eniors and <BoldChar char='G' />
						irls all are very impressed by him and want to talk to him .{' '}
						<BoldChar char='B' />
						ut him being introvert does not want to talk to them directly so he
						takes a girl's number (the name of the girl is mia) and sends a
						message to her via <BoldChar char='W' />
						hatsApp.now the <BoldChar char='G' />
						irl must decode the message by getting into the thought process of{' '}
						<BoldChar char='A' />
						bhishek of what he thinks about the most. <BoldChar char='A' />s the
						girl's videographer, help her get the true meaning of the message
						sent by <BoldChar char='A' />
						bhishek.
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
					<FlashText text='6' />
				</div>
			) : (
				<ErrorPage />
			)}
		</>
	)
}

export default Level1
