import { FunctionComponent } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import navbar from '../../shared/components/Navbar.module.css'
import styles from 'layouts/public/PublicLayout.module.css'

const PublicLayout: FunctionComponent = () => {
	return (
		<div id={styles['container']}>
			<div id={navbar['navbar']}>
				<NavLink to='/'>
					<h1>UniversityFinds</h1>
				</NavLink>

				<div className={navbar['links']}>
					<NavLink className={navbar['link']} to='/about'>
						About
					</NavLink>
					
					
				</div>
				

				<div className={styles['login']}>
					<NavLink className={navbar['link']} to='/login'>
						Log in
					</NavLink>
					<NavLink to='/createaccount' className='btn-primary'>
						Get Started
					</NavLink>
				</div>
			</div>
			<Outlet />
		</div>
	)
}

export default PublicLayout
