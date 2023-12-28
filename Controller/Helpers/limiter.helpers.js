import { rateLimit } from 'express-rate-limit'
// import { Response } from 'express'

export const limitGrt = () => {
  return rateLimit({
    windowMs: 50 + 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => {
      if (parseInt(req.headers['content=length']) > 698) {
        res.status(413).send({
          status: 413,
          message: 'Tamaño de la solicitud alcanzado'
        })
        return true
      }
      return false
    },

    message: (req, res) => {
      res.status(429).send({
        status: 429,
        message: 'Limite alcanzado'
      })
      return true
    }
  })
}

export const limitUsersDelete = () => rateLimit({
  // tiempo de limtacion:
  // 60* 1000 => cada minuto
  // 60*60*1000 => cada hora
  // 1000 => milisegundos
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: true,
  skip: (req, res) => {
    if (parseInt(req.headers['content-length']) > 690) {
      res.status(413).send({
        status: 413,
        message: 'limite alcanzado'
      })
      return true
    }
    return false
  },
  message: (req, res) => {
    res.status(429).send({
      status: 429,
      message: 'Limite alcanzado'
    })
    return true
  }
}
)
