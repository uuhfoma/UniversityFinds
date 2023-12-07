import { ChevronRightIcon, HomeIcon } from '@radix-ui/react-icons'
import { FunctionComponent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'


import { getClassNames } from 'shared/utils/utils'
import axios from 'axios'

const navbar: FunctionComponent = () => {
	const baseUrl = 'http://localhost:5001/api';
	useLocation()
	const navigate = useNavigate()
	const breadCrumbs = () => {
		const { pathname } = window.location
		const paths = pathname
			.split('/')
			.filter((str) => str !== '/')
			.filter((str) => str.length)
			.map((str) => str.charAt(0).toUpperCase() + str.slice(1))

		return paths.map((str, idx) => {
			const isFirstOrLast = idx === paths.length - 1
			const activeClass = idx === paths.length - 1 ? styles['active'] : ''
			const link = [...paths].splice(0, idx + 1).join('/')

			return (
				<div key={idx}>
					<NavLink className={styles['crumb'] + ' ' + activeClass} to={link}>
						{str}
					</NavLink>
					{!isFirstOrLast && <ChevronRightIcon />}
				</div>
			)
		})
	}

	const logout = () => {
		const authToken = { authToken: localStorage.getItem('AUTHTOKEN') }
		const jsonData = JSON.stringify(authToken)

		axios
			.post(baseUrl + '/users/logout', jsonData, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			})
			.then((res) => {
				localStorage.removeItem('AUTHTOKEN')
				console.log('successfully logged out!')
				navigate('/')
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const linkClassNames = (isActive: boolean) =>
		getClassNames({
			active: isActive ? styles['active'] : '',
			link: styles['link'],
		})

	return (
		<div id={styles['container']}>
			<div id={styles['navbar']}>
				<NavLink to='/explore'>
					<h1>UniversityFinds</h1>
				</NavLink>
				<nav className={styles['links']}>
					<NavLink className={({ isActive }) => linkClassNames(isActive)} to='/explore'>
						Explore
					</NavLink>
					<NavLink className={({ isActive }) => linkClassNames(isActive)} to='/likes'>
						Likes
					</NavLink>
					<NavLink className={({ isActive }) => linkClassNames(isActive)} to='/matches'>
						Matches
					</NavLink>
					<NavLink className={({ isActive }) => linkClassNames(isActive)} to='/settings'>
						Settings
					</NavLink>
				</nav>
				<div>
					<NavLink to='/' style={{width: '80px', display: 'block', margin: 'auto', textAlign: 'center'}} className='btn-primary' onClick={logout}>
						Logout
					</NavLink>
				</div>
			</div>

			<div id={styles['breadcrumbs']}>
				<NavLink to='/explore'>
					<HomeIcon />
				</NavLink>
				<ChevronRightIcon />
				{breadCrumbs()}
			</div>
		</div>
	)
}

export default navbar