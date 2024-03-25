import { useEffect, useState } from 'react'
import '../styles/congratulationspage.css'
import { useNavigate } from 'react-router'
import HttpStatusCode from '../constants/HttpStatusCodes'
import Loader from '../components/Loader'

// fix congratulations css

const CongratulationsPage = () => {
	const [currentLevel, setCurrentLevel] = useState(0)
	const isLoggedIn = localStorage.getItem('isLoggedIn') || false

	const navigate = useNavigate()

	const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

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

	useEffect(() => {
		// get the user details from db
		getUserDetails()
	}, [])

	return (
		<>
			{isLoggedIn && currentLevel == 4 ? (
				<div className='congratulations-container'>
					<h1 style={{ color: '#65a30d' }}>Congratulations</h1>
				</div>
			) : (
				<Loader />
			)}
		</>
	)
}

export default CongratulationsPage
