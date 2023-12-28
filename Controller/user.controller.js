import { queryAsync } from './conection.controller.js'

/*
*Todo: Hacer el controlador para actualizar un usuario y prar solicitar la informacion de un usuario
*/

// Logic
const createUser = async (content) => {
  try {
    const result = await queryAsync(
      'INSERT INTO users VALUES(?,?,?)',
      [content.name, content.password, content.isAuth]
    )
    return result
  } catch (error) {
    return null
  }
}

const readUser = async () => {
  try {
    const result = await queryAsync(
      'SELECT * FROM users'
    )
    return result
  } catch (error) {
    return null
  }
}

const removeUser = async (id) => {
  try {
    const result = await queryAsync(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    return result
  } catch (error) {
    return null
  }
}

// Router funtions
export async function getUsers (req, res) {
  try {
    const users = await readUser()
    res.status(200).json({ status: 200, data: users })
  } catch (error) {
    console.error(error)
    res.status(500)
    return { status: 500, Message: 'Internal Error' }
  }
}

export async function deleteUsers (req, res) {
  try {
    const deleteUserRes = await removeUser(req.id)
    res.status(200).json({ status: 200, data: deleteUserRes })
    // eslint-disable-next-line no-undef
    return { status: 200, data: users }
  } catch (error) {
    console.error(error)
    res.status(500)
    return { status: 500, Message: 'Internal Error' }
  }
}

export async function postUsers (req, res) {
  try {
    const { name, password, authBool } = req
    const postUserRes = await createUser(name, password, authBool)
    res.status(200).json({ status: 200, data: postUserRes })
    return { status: 201, data: postUserRes }
  } catch (error) {
    console.error(error)
    res.status(500)
    return { status: 500, Message: 'Internal Error' }
  }
}
