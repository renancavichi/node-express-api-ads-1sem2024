import userModel from "../../models/userModel.js"

const create = (req, res) => {
	const user = req.body
	const dataValidated = userModel.validateCreate(user)
	console.log(dataValidated)
	if(!dataValidated.success){
		return res.status(401).json({
			error: "Dados Inválidos!"
		})
	}
	const result = userModel.create(user)
	res.json({
		success: "Usuário adicionado com sucesso!",
		users: result
	})
}

export default create