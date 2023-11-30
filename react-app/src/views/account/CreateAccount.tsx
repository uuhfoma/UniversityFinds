import React, { useContext } from 'react'
import { useState } from 'react'
import ImageURLInput from "shared/components/img-uploader/ImageURLInput";
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './CreateAccount.module.css'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { User } from 'shared/models/user'
import { UserContext } from 'App'

interface FormData {
	fname: string
	lname: string
	studentEmail: string
    username: string
	password: string
    dob: string;
    age: number;
    school: string;
    class_: string;
    major: string;
    minor: string;
    bio: string;
    pictures: string[];
	gender: 'male' | 'female'
	getToKnow?: User[]  // could be user
    likes: any[]
    notifications?: string[]
}

const baseUrl = 'http://localhost:5001/api'

//Checks if the provided email is already associated with an account
const doesEmailExist = async (studentEmail: string): Promise<boolean> => {
	const res = await fetch(baseUrl + '/users/accountByEmail', {
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify({ studentEmail: studentEmail }),
	})

	if (!res.ok) {
		Promise.reject(res)
	}

	return (await res.json()).getEmail //True or false value
}

const isSchoolEmail = async (studentEmail: string): Promise<boolean> => {
  // Check if the email is valid and ends with '.edu'
  const isValidSchoolEmail = /\S+@\S+\.\S+/.test(studentEmail) && studentEmail.endsWith('.edu');

  return isValidSchoolEmail;
}



function CreateAccount() {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const [submitWarning, setSubmitWarning] = useState('')
	const [step, setStep] = useState(1)
	const [emailExistsError, setemailExistsError] = useState(false)
  const [schoolEmailError, setSchoolEmailError] = useState(false)

	const [formData, setFormData] = useState<FormData>({
		fname: '',
		lname: '',
		studentEmail: '',
    	username: '',
		password: '',
    	dob: '',
		age: 0,
		school: '',
		class_: '',
		major: '',
		minor: '',
		bio: '',
		pictures: [''],
		gender: 'male',
		getToKnow: [],  // could be user
    	likes: [],
    	notifications: [],
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const fieldName = event.target.name
		const fieldValue = event.target.value

		if (emailExistsError) {
			setemailExistsError(false)
		}
    if (!schoolEmailError) {
			setSchoolEmailError(true)
		}


		setFormData((prevState: any) => ({
			...prevState,
			[fieldName]: fieldValue,
		}))
	}

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault()

		if (validateForm(formData)) {
			const jsonData = JSON.stringify(formData)
			console.log(jsonData)
			axios
				.post<User>(baseUrl + '/users/create', jsonData, {
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				})
				.then(({ data }) => {
					userContext?.setUser(data)
					navigate('/explore')
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}

	function validateForm(form: FormData) {
		setSubmitWarning('')
		
		let validForm = true
		//CHECK IF PASSWORD LENGTH IS TOO SHORT
		if (form.password.length < 8) {
			setSubmitWarning('Password must be 8 characters or more')
			validForm = false
		}
		//CHECK IF ACCOUNT ALREADY EXISTS WITH THAT EMAIL
		const emailData = '{"studentEmail": "' + form.studentEmail + '"}'
		axios
			.post(baseUrl + '/users/accountByEmail', JSON.parse(emailData), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.data.getEmail == false) {
					setSubmitWarning('\nEmail is already in use')
					validForm = false				
				}
			})
			.catch((error) => {
				console.error(error)
			})

		return validForm
	}

	//Form for signing up with email or ID provider
	const initialForm = () => {
		return (
			<>
				<div className={styles['section'] + ' ' + styles['header']}>
					<h1>Sign Up</h1>
					<p className='subtitle'>Let's get started with your fitness journey.</p>
				</div>
				<div className={styles['section']}>
					<button className='btn-primary' type='button' onClick={() => setStep(step + 1)}>
						<EnvelopeClosedIcon className={styles['icon']} />
						Sign up with Email
					</button>
				</div>
			</>
		)
	}

	//Form for email and password
	const emailPswdForm = () => {
    
		const { studentEmail, password, username } = formData

		const checkEmail = () => {
			doesEmailExist(studentEmail)
				.then((exists) => {
					setemailExistsError(exists)
          
					if (!exists) {
            isSchoolEmail(studentEmail)
              .then((isSchool) => {
                setSchoolEmailError(isSchool)
                
                if (isSchool){
                  setStep(step + 1)
                }
              })
						
					}
				})
				.catch((err) => {
					console.log('error validating email', err)
				})
		}

		return (
			<>
				<div className={styles['section'] + ' ' + styles['header']}>
					<h1>Sign Up</h1>
					<p className='subtitle'>Welcome to University Finds!    </p>   
         <p> Please enter the required information below to create an account.</p>
				</div>
				<div className={`${styles['section']} ${emailExistsError || schoolEmailError ? styles['error'] : ''}`}>
					<label htmlFor='email'>Email</label>
					<div className={'input' + ' ' + styles['input']}>
						<EnvelopeClosedIcon />
						<input
							type='email'
							id='email'
							name='studentEmail'
							value={studentEmail}
							onChange={handleChange}
							placeholder='johndoe@example.edu'
							required></input>
					</div>
					{emailExistsError && (
						<p className={styles['err-msg']}>The provided email is associated with an existing account.</p>
					)}
          {!schoolEmailError && (
						<p className={styles['err-msg']}>The provided email is not a school email.</p>
					)}
				</div>
				<div className={styles['section']}>
        <label htmlFor='username'>
						Username
						<span className='subtitle'> (8 Characters or more)</span>
					</label>
					<div className={'input' + ' ' + styles['input']}>
						<PersonIcon />
						<input
							type='email'
							id='username'
							name='username'
							value={username}
							onChange={handleChange}
							required
						/>
					</div>

					<label htmlFor='password'>
						Password
						<span className='subtitle'></span>
					</label>
					<div className={'input' + ' ' + styles['input']}>
						<LockClosedIcon />
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={handleChange}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
							required
						/>
					</div>
				</div>
				<div className={styles['section'] + ' ' + styles['submit']}>
					<button className='btn-secondary' type='button' onClick={() => setStep(step - 1)}>
						Back
					</button>
					<button
						className='btn-primary'
						onClick={checkEmail}
						type='button'
						disabled={!studentEmail || !password || password.length < 8}>
						Next
					</button>
				</div>
			</>
		)
	}

	//Form for first and last name and profile type
	const profileInfoForm = () => {
		const isMale = formData.gender === 'male'
		const isFemale = formData.gender === 'female'
		const { fname, lname, dob, school,  major, minor, class_, age  } = formData
		const calculateAge = (event: React.ChangeEvent<HTMLInputElement>)  => {
			let fieldValue = event.target.value;
			const dob_ = new Date(event.target.value);
			const today = new Date();
			let age_ = today.getFullYear() - dob_.getFullYear();
			const m = today.getMonth() - dob_.getMonth();
		
			if (m < 0 || (m === 0 && today.getDate() < dob_.getDate())) {
				age_--;
			}
			
			setFormData((prevState: any) => ({
				...prevState,
				['dob']: fieldValue,
			}))
			setFormData((prevState: any) => ({
				...prevState,
				['age']: age_,
			}))

		}

		return (
			<>
				<div className={styles['section'] + ' ' + styles['header']}>
					<h1>Profile Information</h1>
					<p className='subtitle'>
						Information such as your first and last name and DOB are required for all members.
					</p>
				</div>

				<div className={styles['section']}>
					<label htmlFor='fname'>First Name</label>
					<input
						type='text'
						name='fname'
						id='fname'
						placeholder='John'
						value={fname}
						onChange={handleChange}
            required
					/>
				</div>

				<div className={styles['section']}>
					<label htmlFor='lname'>Last Name</label>
					<input
						type='text'
						name='lname'
						id='lname'
						placeholder='Doe'
						value={lname}
						onChange={handleChange}
            required
					/>
				</div>
        <div>
            <label htmlFor="dob">Date of Birth: </label>
            <input 
                type="date" 
                id="dob" 
                name="dob"
                value={dob} 
                onChange={calculateAge} 
                required
            />
			{/* {age = calculateAge(dob)} */}
        </div>

				<div className={styles['section']} id={styles['member-type-section']}>
					<label>I Am a</label>
					<label
						htmlFor='male'
						className={styles['member-type'] + ' ' + (isMale ? styles['active'] : '')}>
						Male
						<input
							type='radio'
							name='gender'
							id='male'
							value='male'
							checked={isMale}
							onChange={handleChange}
						/>
					</label>
					<label
						htmlFor='female'
						className={styles['member-type'] + ' ' + (isFemale ? styles['active'] : '')}>
						Female
						<input
							type='radio'
							name='gender'
							id='female'
							value='female'
							checked={isFemale}
							onChange={handleChange}
						/>
					</label>
				</div>
        <div className={styles['section']}>
					<label htmlFor='lname'>School</label>
					<input
						type='text'
						id='school'
						name='school'
						value={school}
						onChange={handleChange}
					/>
				</div>
        <div className={styles['section']}>
					<label htmlFor='lname'>Class</label>
					<input
						type='text'
						id='class_'
						name='class_'
						value={class_}
						onChange={handleChange}
            placeholder='Freshman/Sophomore/Junior/Senior'
            
					/>
				</div>
        <div className={styles['section']}>
					<label htmlFor='lname'>Major</label>
					<input
						type='text'
						id='major'
						name='major'
						value={major}
						onChange={handleChange}
            
					/>
				</div>
        <div className={styles['section']}>
					<label htmlFor='lname'>Minor</label>
					<input
						type='text'
						id='minor'
						name='minor'
						value={minor}
						onChange={handleChange}
            
					/>
				</div>
        
				<div className={styles['section'] + ' ' + styles['submit']}>
					<button className='btn-secondary' onClick={() => setStep(step - 1)}>
						Back
					</button>
					<button className='btn-primary' type='button' onClick={() => setStep(step + 1)}>
						Next
					</button>
				</div>
			</>
		)
	}

	//Form for personal information
	const imgBioForm = () => {
		const { bio, pictures } = formData
		const handleUrlChange = (newUrl: string) => {
			setFormData((prevState: any) => ({
				...prevState,
				['pictures']: [newUrl],
			}))
		};

		return (
			<>
				<div className={styles['section'] + ' ' + styles['header']}>
					<h1>Complete Signup</h1>
					<p className='subtitle'>We just need a picture and a bio to complete your profile.</p>
				</div>
				<div className={styles['section']} id={styles['height']}>
					 <ImageURLInput imgURL={pictures[0]} name="URL" value ={pictures[0]} onUrlChange={handleUrlChange} /> 
				</div>

				<div className={styles['section']}>
					<label htmlFor='bio' >
						Bio <span className='subtitle'> (Write a litte bit about your self and what you want other people to know!) </span>
            
					</label>
          <textarea name="bio" id='bio' rows={4} onChange={handleChange} value={bio}></textarea>
					{/* <input type='text' name='bio' id='bio' value={bio} onChange={handleChange} /> */}

				</div>

				<div className={styles['section'] + ' ' + styles['submit']}>
					<button className='btn-secondary' onClick={() => setStep(step - 1)}>
						Back
					</button>
					<button
						className='btn-primary'
						type='submit'
						onClick={handleSubmit}
						>
						Complete Signup
					</button>
				</div>
			</>
		)
	}

	//TODO ADD A USER OR FITNESS TRAINER OPTION ON ACCOUNT SIGNUP
	return (
		<form id={styles['account-form']}>
			{step === 1 && initialForm()}
			{step === 2 && emailPswdForm()}
			{step === 3 && profileInfoForm()}
			{step === 4 && imgBioForm()}

			<NavLink to='/login' id={styles['login']}>
				Already have an account?
			</NavLink>
		</form>
	)
}
export default CreateAccount