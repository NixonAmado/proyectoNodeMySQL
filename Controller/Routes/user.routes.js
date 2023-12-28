import { getUsers, postUsers, deleteUsers } from '../user.controller.js'
import { Router } from 'express'
import { limitUsersDelete } from '../Helpers/limiter.helpers.js'
export const user = Router()

user.get('/', getUsers)
user.post('/', postUsers)
user.delete('/', limitUsersDelete(), deleteUsers)
