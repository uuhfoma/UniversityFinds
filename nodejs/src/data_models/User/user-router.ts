import { Router } from 'express'
import * as userDB from './user-db'
import { User } from './user-model'
import {
	createUser,
	generateAuthToken,
	getUserByEmail,
	userLogin,
	userLogout,
} from './user-db'
import sessionAuthMiddleware from 'middleware/session-auth'
//Name of cookie
const COOKIE_NAME = 'auth'
const router = Router()

router.use('/me', sessionAuthMiddleware)

router.get('/me', async (req, res) => {
	const userId = res.locals.userId
	const stringId = userId.toString();
	
	const user = await userDB.getUserById(stringId)

	res.json(user)
	console.log(stringId)
	console.log(user)
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	console.log('Getting user with id: ', id)

	userDB
		.getUserById(id)
		.then((user) => {
			console.log(user)

			if (user) {
				res.json(user)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
})

//LOGIN TO ACCOUNT
router.post('/login', async (req, res) => {
	userLogin(req.body).then(function (result) {
		console.log('sending confirmation: ' + result)
		if (result == 'xxx') {
			res.sendStatus(401)
		} else {
			res.cookie(COOKIE_NAME, result, {
				maxAge: 1000 * 60 * 60 * 24, //24 hours
				secure: true,
			}).sendStatus(201)
		}
	})
})

//LOGOUT OF ACCOUNT
router.post('/logout', async (req, res) => {
	//console.log(req.body)
	const authToken = req.body.authToken
	userLogout(authToken).then(function (result) {
		console.log('sending confirmation: ' + result)
		if (!result) {
			res.sendStatus(401)
		} else {
			res.clearCookie(COOKIE_NAME).sendStatus(201)
		}
	})
})

//Create User
router.post('/create', async (req, res) => {
	const user: User = req.body

	let result = await createUser(req.body)

	if (!result) {
		res.send(400)
		return
	}
	user._id = result.id

	res.cookie(COOKIE_NAME, result.token, {
		maxAge: 1000 * 60 * 60 * 24, //24 hours
		secure: true,
	}).json(user)
})

//check if emailexists
router.post('/accountByEmail', async (req, res) => {
	console.log('email TO SEND: ' + req.body.studentEmail)
	getUserByEmail(req.body.studentEmail).then((getEmail) => {
		console.log('Email exists? ' + getEmail)
		res.json({ getEmail })
	})
})
//gets all users except the specified id
router.get('/profilestack/:id', async (req, res) => {
    const { id } = req.params
	console.log('Getting user profiles stack')

	userDB
		.getUsersExcept([id])
		.then((users) => {
			console.log(users)
			res.json(users)
		})
		.catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
})

router.put('/update/:id', async (req, res) => {
	const { id } = req.params
	const user: User = req.body

	console.log('Updating user with id: ', id)

	userDB
		.updateUserById(id, user)
		.then((result) => {
			console.log(result)
			res.sendStatus(204)
		})
		.catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
})

// router.post('/add', async (req, res) => {
// 	const user: User = req.body

// 	console.log('Adding user: ', user)

// 	userDB
// 		.addUser(user)
// 		.then((id) => {
// 			console.log('Added user with id:', id)
// 			res.json({ id: id })
// 		})
// 		.catch((err) => {
// 			console.log(err)

// 			res.sendStatus(500)
// 		})
// })

router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params

	console.log('Deleting user with id: ', id)

	try {
		const { deletedCount } = await userDB.deleteUserById(id)

		if (deletedCount == 0) {
			res.sendStatus(401)
			return
		}

		res.sendStatus(204)
	} catch (err) {
		console.log(err)

		res.sendStatus(500)
	}
})




export default router