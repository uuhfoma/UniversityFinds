import React, { useContext } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './Login.module.css'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { UserContext } from 'App'
import { User } from 'shared/models/user'

function LoginAccount() {
	interface FormData {
		email: string
		password: string
	}

	let baseUrl = 'http://localhost:5001/api'
	const navigate = useNavigate()
	const userContext = useContext(UserContext)

	const [submitWarning, setSubmitWarning] = useState('')
	const [loginError, setLoginError] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
	})

	function validateForm(form: FormData) {
		setSubmitWarning('')
		let validForm = true
		//CHECK IF PASSWORD LENGTH IS TOO SHORT
		if (form.password.length < 8) {
			setSubmitWarning('Password must be 8 characters or more')
			validForm = false
		}

		return validForm
	}
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = event.target.name
		const fieldValue = event.target.value
		setFormData((prevState: any) => ({
			...prevState,
			[fieldName]: fieldValue,
		}))
	}

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault()

		if (validateForm(formData)) {
			const jsonData = JSON.stringify(formData)
			axios
				.post(baseUrl + '/users/login', jsonData, {
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				})
				.then((res) => {
					console.log('SUCCESSFUL CODE: ' + res.data)
					console.log('logged in... redirecting')
					fetch(baseUrl + '/users/me', {
						credentials: 'include',
					})
						.then((res) => {
							if (!res.ok) {
								return Promise.reject(res.status)
							}

							return res.json()
						})
						.then((user: User) => {
							userContext!.setUser(user)
							navigate('/')
						})
						.catch((err) => {
							console.log('error getting user', err)
						})
				})
				.catch((error) => {
					setLoginError(true)
					console.error(error)
				})
		}
	}

	const emailField = () => (
		<div className={'input' + ' ' + styles['input']}>
			<EnvelopeClosedIcon />
			<input
				type='email'
				id='email'
				name='email'
				onChange={handleChange}
				placeholder='johndoe@example.com'
				required></input>
		</div>
	)

	const pswdField = () => (
		<div className={'input' + ' ' + styles['input']}>
			<LockClosedIcon />
			<input
				className='input'
				type='password'
				id='password'
				name='password'
				onChange={handleChange}
				placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
				required
			/>
		</div>
	)

	return (
		<div id={styles['login']}>
			<h1>Welcome Back</h1>
			<form id={styles['loginForm']} onSubmit={handleSubmit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Email:</label>
					{emailField()}
				</div>

				<div className={styles['field']}>
					<label htmlFor='password'>Password:</label>
					{pswdField()}
				</div>

				<div className={styles['field']}>
					<button className='btn-primary' type='submit' id='submitButton' value='Login'>
						Login
					</button>
					{
						loginError &&
						<p className={styles['loginError']}>Incorrect email or password</p>
					}
				</div>

				

				
				<NavLink id={styles['create']} to='/createaccount'>
					Don't have an account?
				</NavLink>
			</form>
		</div>
	)
}
export default LoginAccount