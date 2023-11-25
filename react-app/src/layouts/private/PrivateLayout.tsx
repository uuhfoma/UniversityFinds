import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from 'shared/components/Navbar'
import styles from './PrivateLayout.module.css'
import { UserContext } from 'App'
import { User } from 'shared/models/user'
import { Navigate } from 'react-router-dom'

interface PrivateLayoutProps {}

const PrivateLayout: FunctionComponent<PrivateLayoutProps> = () => {
	const  baseUrl  = 'http://localhost:5001/api'
	const userContext = useContext(UserContext)
	const [currentView, setCurrentView] = useState<any>(null)

	useEffect(() => {
		setCurrentView(
			<div id={styles['layout']}>
				<Navbar />
				<Outlet />
			</div>
		)
		//This will replaced when signing up is complete
		// fetch(baseUrl + '/users/me', { credentials: 'include' })
		// 	.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
		// 	.then((user: User) => {
		// 		userContext?.setUser(user)
		// 		setCurrentView(
		// 			<div id={styles['layout']}>
		// 				<Navbar />
		// 				<Outlet />
		// 			</div>
		// 		)
		// 	})
		// 	.catch((status) => {
		// 		console.log('error retreiving user', status)
		// 		setCurrentView(<Navigate to='/login' />)
		// 	})
	}, [])

	return currentView
}

export default PrivateLayout