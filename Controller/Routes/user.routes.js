import { getUsers, postUsers, deleteUsers } from '../user.controller.js'
import { Router } from 'express'
import { limitUsersDelete } from '../Helpers/limiter.helpers.js'
import { validateU } from '../storage/user.dto.js'
export const user = Router()

user.get('/', getUsers)
user.post('/', validateU, postUsers)
user.delete('/:id', limitUsersDelete(), deleteUsers)
