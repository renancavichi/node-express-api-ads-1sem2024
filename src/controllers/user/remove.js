import userModel from "../../models/userModel.js"

const remove = (req, res) => {
	const id = req.body.id
	const dataValidated = userModel.validateId(id)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const usersResult = userModel.remove(dataValidated.data.id)
	res.json({
		success: `Usuário ${id} removido com sucesso!`,
		users: usersResult
	})
}

export default remove