import userModel from "../../models/userModel.js"
import {compare} from 'bcrypt'

const login = async (req, res) => {
    //lembrar try catch
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

    
    return res.json({
		success: `Usuário do login!`,
		user: userFound
	})

}

export default login