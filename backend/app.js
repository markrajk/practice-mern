import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

// Development login
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Hello from server')
})

// Middleware to log cookies and time of req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.cookies)
  next()
})

app.use('/api/v1/users/', userRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler)

export default app
