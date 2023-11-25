import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { User } from 'shared/models/user'
import React, { useState } from 'react'
import Matches from './views/matches/matches'
import PrivateLayout from 'layouts/private/PrivateLayout'
import PublicLayout from 'layouts/public/PublicLayout'
import Explore from 'views/explore/explore'
import Likes from 'views/likes/likes'
import Settings from 'views/settings/settings'
import Home from 'views/home/Home'
import Login from 'views/account/Login'
import CreateAccount from 'views/account/CreateAccount'
import About from 'views/about/about'

type UserContext = {
	user: User | undefined
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = React.createContext<UserContext | undefined>(undefined)

export default function App() {
	const [user, setUser] = useState<User | undefined>(undefined)
	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateLayout />}>
						<Route path='/explore' index element={<Explore />} />
						<Route path='/likes' element={<Likes />} />
						<Route path='/matches' element={<Matches />} />
						<Route path='/settings' element={<Settings />} />
					</Route>

					<Route element={<PublicLayout />}>
						<Route path='/' index element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/createaccount' element={<CreateAccount />} />
						<Route path='/about' element={<About />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	)
}