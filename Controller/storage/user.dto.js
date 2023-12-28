import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { User } from '../../dist/User.js'
// npx tsc

export async function validateU (req, res, next) {
  try {
    const data = plainToClass(User, req.body, // => convierte de json a clase
      {
        excludeExtraneousValues: true
      }
    )
    await validate(data)
    req.body = data
    next()
    return data
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: 'error' })
    return error
  }// middleware para validar los datos
}
