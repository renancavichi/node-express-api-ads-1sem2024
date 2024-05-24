import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const logout = async (req, res) => {
    let refreshToken = false

    refreshToken = req?.cookies?.refreshToken

    const authorization = req.headers?.authorization
    if(authorization) refreshToken = authorization.split(' ')[1]

    if(!refreshToken) return res.status(401).json({
        error: 'Usuário não autorizado.',
        code: 'token-not-found'
    })

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })

    const sessionFound = await prisma.session.delete({
        where: {
            token: token
        }
    })

    // remover em caso de outra task limpar sessões
    if(!sessionFound){
        return res.status(401).json({
            error: 'Sessão não encontrada.',
        })
    }
    
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })

    return res.json({
        success: `Logout realizado com sucesso!`
    })

}

export default logout