import userModel from "../../models/userModel.js"

const edit = (req, res) => {
	const newUser = req.body
	const dataValidated = userModel.validateEdit(newUser)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const usersResult = userModel.edit(dataValidated.data)
	res.json({
		success: `Usuário ${newUser.id} atualizado com sucesso!`,
		users: usersResult
	})
}

export default edit