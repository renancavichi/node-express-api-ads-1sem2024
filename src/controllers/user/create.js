import userModel from "../../models/userModel.js"

const create = (req, res) => {
	const user = req.body
	const dataValidated = userModel.validateCreate(user)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const result = userModel.create(dataValidated.data)
	res.json({
		success: "Usuário adicionado com sucesso!",
		users: result
	})
}

export default create