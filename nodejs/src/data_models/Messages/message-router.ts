import { Router } from 'express'
import * as messageDB from './message-db'
import { Message } from './message-model'
const router = Router()

router.post('/add', async (req, res) => {
	const message: Message = req.body

	console.log('Adding message: ', message)

	messageDB
		.addMessage(message)
		.then((id) => {
			console.log('Added message with id:', id)
			res.json({ id: id })
		})
		.catch((err) => {
			console.log(err)

			res.sendStatus(500)
		})
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	console.log('Getting message with id: ', id)

	messageDB
		.getMessageById(id)
		.then((message) => {
			console.log(message)

			if (message) {
				res.json(message)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			console.log(err)
			res.sendStatus(500)
		})
})

router.get('/directmessage', async (req, res) =>{
    const id_sender = req.body[0]
    const id_receiver = req.body[1]

    console.log('Getting messages between ', id_sender, 'and ', id_receiver)

    messageDB
        .getConversation(id_sender, id_receiver)
        .then((messages) => {
            console.log(messages)
            res.json(messages)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })


}) 

export default router