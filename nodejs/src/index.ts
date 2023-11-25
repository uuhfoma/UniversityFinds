//runs the backend
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import userRouter from 'data_models/User/user-router'
import messageRouter from 'data_models/Messages/message-router'

dotenv.config({ path: './env' })

const app: Express = express()
const port = process.env.PORT || 5001

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/messages', messageRouter)

const REACT_PATH = '../dist';

app.use(express.static(path.resolve(__dirname, REACT_PATH)));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, REACT_PATH, 'index.html'));
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})