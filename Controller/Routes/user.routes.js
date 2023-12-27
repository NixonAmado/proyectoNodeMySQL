import { getUsers, postUser, deleteUser } from '../user.controller.js'
import { Router } from 'express'

export const user = Router()

user.get('/', (req, res) => {
  res.send('Bienvenido a la ruta inicial de los usuarios')
})
