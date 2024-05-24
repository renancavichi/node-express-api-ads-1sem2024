import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'
import userModel from '../../models/userModel.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const refreshToken = (req, res) => {
    let refreshToken = false

    refreshToken = req?.cookies?.refreshToken

    const authorization = req.headers?.authorization
    if(authorization) refreshToken = authorization.split(' ')[1]

    if(!refreshToken) return res.status(401).json({
        error: 'Usuário não autorizado.',
        code: 'token-not-found'
    })

    jwt.verify(token, SECRET_KEY, async (error, decoded) => {
        if(error) return res.status(401).json({
            error: 'Usuário não autorizado.',
            message: error.message,
            code: 'invalid-token'
        })
        const userFound = await userModel.getById(decoded.id)
        const sessionFound = await prisma.session.findUnique({
            where: {
                token: token,
                user_id: userFound.id
            }
        })
        if(!sessionFound?.id) return res.status(401).json({
            error: 'Usuário não autorizado.',
            code: 'session-not-found'
        })
        const accessToken = jwt.sign(
            {id: userFound.id, name: userFound.name}, //payload - dados que você quer guardar no token
            SECRET_KEY,  //Chave secreta
            {expiresIn: '1m'}
            )
        const newRefreshToken = jwt.sign(
            {id: userFound.id}, //payload - dados que você quer guardar no token
            SECRET_KEY,  //Chave secreta
            {expiresIn: '3m'}
            )

        await prisma.session.update({
            where:{
                user_id: userFound.id,
                token: token,
            },
            data: {
                token: newRefreshToken
            }
        })  
        delete userFound.pass
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 30 * 24 * 60 * 60 * 1000 })
        return res.json({
            success: `AccessToken e RefreshToken Revalidado!`,
            user: userFound,
            accessToken,
            newRefreshToken
        })
    })
}

export default refreshToken