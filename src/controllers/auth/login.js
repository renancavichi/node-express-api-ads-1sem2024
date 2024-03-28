import userModel from '../../models/userModel.js'
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'

const login = async (req, res) => {
    //TODO: lembrar try catch
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

    //TODO: gerar cookie para web

    delete userFound.pass
    return res.json({
		success: `Usuário do login!`,
		user: userFound,
        accessToken,
        refreshToken
	})

}

export default login