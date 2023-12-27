import dotenv from 'dotnev'
import mysql from 'mysql2'

// importacion de Variables de entorno
dotenv.config({ path: '../' })

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

  }
)

db.connect((err, req, res) => {
  if (err) {
    res.status(500).send('Error al conectar la Base de datos')
  }
  console.log('Conexion exitosa')
})

export function queryAsync (sql, options) {
  return new Promise(
    (resolve, reject) => {
      db.query(sql.options, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    }
  )
}
