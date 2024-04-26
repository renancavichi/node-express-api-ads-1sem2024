import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

const auth = (req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({
        error: 'Usuário não autorizado.',
        code: 'header-authorization-not-found'
    }) 
    const bearer = authorization.split(' ')[0]
    if(bearer !== 'Bearer') return res.status(401).json({
        error: 'Usuário não autorizado.',
        message: 'Use o Padrão Bearer ###AccessToken### no Header Authorization',
        code: 'bearer-not-found'
    })
    const token = authorization.split(' ')[1]
    if(!token) return res.status(401).json({
        error: 'Usuário não autorizado.',
        message: 'Use o Padrão Bearer ###AccessToken### no Header Authorization',
        code: 'token-not-found'
    })
    let userDecoded
    try {
        userDecoded = jwt.verify(token, SECRET_KEY)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
        return res.status(401).json({ error: 'Token expirado.', code: 'expired-token' })
      }
      res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
      return res.status(401).json({ error: 'Token Inválido.', code: 'invalid-token'})
    }
    req.userLogged = {id: userDecoded.id, name: userDecoded.name}
    next()
}

export default auth