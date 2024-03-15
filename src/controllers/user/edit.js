import userModel from "../../models/userModel.js"

const edit = async (req, res) => {
	const newUser = {...req.body, id: +req.params.id}
	const dataValidated = userModel.validateEdit(newUser)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const usersResult = await userModel.edit(dataValidated.data)
	res.json({
		success: `Usuário ${newUser.id} atualizado com sucesso!`,
		user: usersResult
	})
}

export default edit