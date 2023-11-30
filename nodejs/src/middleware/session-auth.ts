import { Session } from 'data_models/User/user-model'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import client from 'mongodb/client'

const sessionAuthMiddleware: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const db = client.db()
	const cookie = req.cookies['auth']

	if (!cookie) {
		console.log('Client is not autheticated...redirecting')

		res.sendStatus(401)
		return
	}

	const auth = db.collection<Session>('userAuthentication')
	const existingSession = await auth.findOne({ token: cookie })

	if (!existingSession) {
		console.log('Client is not autheticated...redirecting')
		res.sendStatus(401)
		return
	}

	console.log('Client is autheticated')

	res.locals.userId = existingSession._id
	next()
}

export default sessionAuthMiddleware