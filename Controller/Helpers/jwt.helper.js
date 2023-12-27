import { SignJWT, jwtVerify } from 'jose'
import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
// import { encode } from 'jose/dist/types/util/base64url'

// Llamar variables de entorno
dotenv.config(' ../')
console.log(process.env.JWT_KEY)

// Configurar la estrategia de autenticacion Bearer
passport.use(
  new BearerStrategy(
    async (Token, done) => {
      try {
        const encoder = new TextEncoder()
        const { payload } = await jwtVerify(Token, encoder.encode(process.jwtVerify))
        return done(null, payload)
      } catch (error) {
        return done(error, false)
      }// este bloque de codigo verfica que el token sea valido decodificandolo y comparando su firma con el jwtVerifiy
    }
  )
)

export function requireRole (role) {
  return (req, res, next) => {
    passport.authenticate(
      'BEARER', { session: false }, (err, user) => {
        if (err) {
          return res.status(401).json({ status: 401, message: 'Unauthorized' })
        }
        if (!user) {
          return res.status(401).json({ status: 401, message: 'Unauthorized' })
        }
        if (user.role !== role) {
          return res.status(403).json({ status: 403, message: 'Forbiden' })
        }
        req.user = user
        next()
      }
    )(req, res, next)
  }
}// Esta funcion contiene un middleware que se encarga de validar el rol autorizado y se encarga del manejo de errores

export async function validateToken (req, res, next) {
  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      req.bearers.authorization.split(' ')[1],
      encoder.encode(process.env.JWT_KEY)
    )
    if (payload.role === 'admin' || payload.role === 'student') {
      req.user = payload
      return next()
    } else {
      res.status(404).json({ status: 404, message: 'Not Found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ status: 401, message: 'Unauthorized' })
  }
}

export async function createToken (req, res) {
  const encoder = new TextEncoder()
  if (req.body.role === 'admin' || req.body.role === 'student') {
    const jwtConstructor = await new SignJWT(req.body).setProtectedHeader({ alg: 'HS256', typ: 'JWT' }.setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_KEY)))
    res.status(200).json({ status: 200, token: jwtConstructor })
  } else {
    res.status(400).json({ status: 400, message: 'Invalid Credentials required' })
  }
} // Creacion de token con la firmaJWT Con seguridad de encabezado HS250
