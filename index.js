/* eslint-disable no-multiple-empty-lines */
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import { createToken } from './Controller/Helpers/jwt.helper.js'
const app = express()

// settings
dotenv.config()
app.set('port', process.env.PORT || 8080)

// middlewares
app.use(morgan('dev'))
app.use(express.json()) // enviar archivos json por medio del body
app.use(cors({ origin: '*' }))

// Routes
app.get('/', (req, res) => {
  res.send('Hola mundo')
})
app.get('/token', createToken)

// Server listen
app.listen(app.get('port'), () => {
  console.log('My port: http://localhost/' + app.get('port'))
})
