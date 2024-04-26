import userModel from '../../models/userModel.js'
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const login = async (req, res) => {
    try{
        const {email, pass} = req.body

        //pegar pass (hash) buscando pelo email 
        const userFound = await userModel.getByEmail(email)
        if(!userFound) return res.status(401).json({
            error: "Email ou senha inválida!"
        })
        //verificar se o hash é válido (bcrypt)
        const isValid = await compare(pass, userFound.pass)
        if(!isValid) return res.status(401).json({
            error: "Email ou senha inválida!"
        })

        //continuar o login e gerar os token de acesso
        const accessToken = jwt.sign(
            {id: userFound.id, name: userFound.name}, //payload - dados que você quer guardar no token
            SECRET_KEY,  //Chave secreta
            {expiresIn: '1m'}
            )
        
        const refreshToken = jwt.sign(
            {id: userFound.id}, //payload - dados que você quer guardar no token
            SECRET_KEY,  //Chave secreta
            {expiresIn: '3m'}
            )

        await prisma.session.create({
            data: {
                user_id: userFound.id,
                client: req.headers['user-agent'],
                token: refreshToken
            }
        })

        delete userFound.pass

        //gera o cookie do refresh token para web (3 meses) 3 * 30 * 24 * 60 * 60 * 1000
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 30 * 24 * 60 * 60 * 1000 })

        return res.json({
            success: `Usuário do login!`,
            user: userFound,
            accessToken,
            refreshToken
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            error: "Erro interno, tente novamente mais tarde!"
        })
    }
}

export default login