import userModel from "../../models/userModel.js"

const create = async (req, res) => {
	const user = req.body
	const dataValidated = userModel.validateCreate(user)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const result = await userModel.create(dataValidated.data)
	res.json({
		success: "Usuário adicionado com sucesso!",
		user: result
	})
}

export default create