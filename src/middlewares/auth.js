import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

const auth = (req, res, next) => {
    const autorization = req.headers.authorization
    if(!autorization) return res.status(401).json({
        error: 'Usuário não autorizado.',
        code: 'token-not-found'
    }) 
    const bearer = autorization.split(' ')[0]
    if(bearer !== 'Bearer') return res.status(401).json({
        error: 'Usuário não autorizado.',
        message: 'Use o Padrão Bearer ###AccessToken### no Header Autorization',
        code: 'bearer-not-found'
    })
    const token = autorization.split(' ')[1]
    if(!token) return res.status(401).json({
        error: 'Usuário não autorizado.',
        message: 'Use o Padrão Bearer ###AccessToken### no Header Autorization',
        code: 'token-not-found'
    })
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if(error) return res.status(401).json({
            error: 'Usuário não autorizado.',
            message: error.message,
            code: 'token-not-found'
        })
        req.userLogged = {id: decoded.id, name: decoded.name}
    })
    next()
}

export default auth