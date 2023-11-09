import { Router } from 'express'
import * as userDB from './user-db'
import { User } from './user-model'

const router = Router()

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

router.post('/add', async (req, res) => {
	const user: User = req.body

	console.log('Adding user: ', user)

	userDB
		.addUser(user)
		.then((id) => {
			console.log('Added user with id:', id)
			res.json({ id: id })
		})
		.catch((err) => {
			console.log(err)

			res.sendStatus(500)
		})
})

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