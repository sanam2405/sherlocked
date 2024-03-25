/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import Loader from '../components/Loader'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()


	const BACKEND_BASE_URI: string = import.meta.env.VITE_BACKEND_BASE_URI

	const postData = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
		setIsLoading(true)
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})
			const { status } = response
			const jsonData = await response.json()
			if (status === HttpStatusCode.CREATED) {
				localStorage.setItem('jwt', jsonData.token)
				localStorage.setItem('user', jsonData.username)
				setTimeout(() => {
					console.log('Logged in!')
					localStorage.setItem('isLoggedIn', 'true')
					navigate('/level-1')
				}, 500)
			}
		} catch (error) {
			alert("That's what she said")
			setIsLoading(false)
		}
	}
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='login-container'>
					<form onSubmit={event => postData(event)} className='login-form'>
						<input
							type='text'
							placeholder='Username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='login-input'
						/>
						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='login-input'
						/>
						<button type='submit' className='login-button'>
							Enter Sherlocked :){' '}
						</button>
					</form>
				</div>
			)}
		</>
	)
}
export default Login
