import React, { useContext }from 'react';
import axios from 'axios'
import styles from './CreateAccount.module.css'
import { useState } from 'react'
import { UserContext } from 'App';
import { User } from 'shared/models/user';
import { IntegerType } from 'mongodb';
import { NavLink, Navigate, useNavigate } from 'react-router-dom'


let baseUrl = 'http://localhost:5001/api'
	const navigate = useNavigate()
  
function CreateAccount() {
  interface SignUpData{
    fname:String
    lname:string
    username:string
    studentEmail: String
    password: String
    confirmPassword: String
    dob: string
    school: string
    age: number | null
    classStanding: string
    major: string
    minor: string
  }
  const [SignupError, setSignupError] = useState(false);
	const userContext = useContext(UserContext)
  const [submitWarning, setSubmitWarning] = useState('')
  const [SignUpData, setSignUpData] = useState<SignUpData>({
    fname: '',
    lname: '',
    username: ' ',
    studentEmail: '',
    password: '',
    confirmPassword: '',
    dob: '',
    school: '',
    age: null,
    classStanding:'',
    major: '',
    minor: '',
	})
	function validateForm(form: SignUpData) {
    setSubmitWarning('')
    let validForm = true
    //Check to see that the passwords match are are greater than 8 characters;
    if (form.password !== form.confirmPassword) {
      setSubmitWarning("Passwords don't match");
      validForm = false
    }
    if (form.password.length < 8) {
			setSubmitWarning('Password must be 8 characters or more')
			validForm = false
		}
    // validating if the student email is a a student email
    if (!form.studentEmail.endsWith('.edu')) {
      setSubmitWarning('Student email must end in .edu')
      validForm = false
   }
   // age is a valid number
   if (typeof form.age !== 'number') {
    setSubmitWarning('Age must be a number')
    validForm = false
  }
  // the dob is an actual date
  if (isNaN(Date.parse(form.dob))) {
    setSubmitWarning('DOB must be a valid date')
    validForm = false
 }

 return validForm
}

async function handleSubmit(e: { preventDefault: () => void }) {
  e.preventDefault();

  const { fname,lname, studentEmail, password, confirmPassword, dob, classStanding, major, minor,age,school} = SignUpData;

  if (!validateForm({
    age, studentEmail, password, confirmPassword, dob, fname, lname, school, classStanding, major, minor,
    username: ''
  })) {
      return;
  }

  const response = await fetch('/api/createAccount', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, studentEmail, password, confirmPassword, dob,}),
      credentials: 'include',
  });

  if (response.ok) {
      const userData = await response.json();
      updateUserContext(userData);
      navigate('/home');
  } else {
      setSignupError(true);
      console.error('Failed to create account:', response.statusText);
  }
}

  return (
    <div>
      {/* Component content goes here */}
    </div>
  );
  }


export default CreateAccount;