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
router.get('/directmessage', async (req, res) =>{
	
    const id_sender = typeof req.query.id_sender === 'string' ? req.query.id_sender : null;
    const id_receiver = typeof req.query.id_receiver === 'string' ? req.query.id_receiver : null;
	console.log('Getting messages between ', id_sender, 'and ', id_receiver)
    

	if (!id_sender || !id_receiver) {
        // Handle the case where one or both of the IDs are missing or not strings
        res.status(400).send("Invalid request parameters");
        return;
    }

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

router.get('/latestmessage', async (req, res) =>{
	
    const id_sender = typeof req.query.id_sender === 'string' ? req.query.id_sender : null;
    const id_receiver = typeof req.query.id_receiver === 'string' ? req.query.id_receiver : null;
	console.log('Getting latest message between ', id_sender, 'and ', id_receiver)
    

	if (!id_sender || !id_receiver) {
        // Handle the case where one or both of the IDs are missing or not strings
        res.status(400).send("Invalid request parameters");
        return;
    }

    messageDB
        .getLatestMessage(id_sender, id_receiver)
        .then((message) => {
            console.log(message)
            res.json(message)
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

 

export default router