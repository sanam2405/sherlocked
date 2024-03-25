/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
	const navigate = useNavigate()

	const notifySuccess = (message: string): void => {
		toast.success(message)
	}

	const handleLogin = () => {
		navigate('/login')
	}

	const BACKEND_BASE_URI: string = import.meta.env.VITE_BACKEND_BASE_URI

	const postData = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
        if(password != confirmPassword) {
            alert("Password and Confirm Password doesn't match")
            return
        }
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/register`, {
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
				// localStorage.setItem('jwt', jsonData.token)
				// localStorage.setItem('user', jsonData.username)
				setTimeout(() => {
					console.log('Registered for Sherlocked 2024!')
					// notifySuccess('Welcome to Sherlocked 2024')
					// localStorage.setItem('isLoggedIn', 'true')
					navigate('/login')
				}, 500)
			}
		} catch (error) {
			alert("That's what she said")
		}
	}
	return (
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
                <input
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={e => setconfirmPassword(e.target.value)}
					className='login-input'
				/>
				<button type='submit' className='login-button'>
					Register for Sherlocked!{' '}
				</button>
				<button onClick={handleLogin} className='login-button'>
					Login{' '}
				</button>
			</form>
			<ToastContainer autoClose={2000} theme='light' />
		</div>
	)
}
export default Register
