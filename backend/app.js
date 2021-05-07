import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

// Development login
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// Middleware to log cookies and time of req
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString()
//   console.log(req.cookies)
//   next()
// })

app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/posts/', postRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler)

export default app
