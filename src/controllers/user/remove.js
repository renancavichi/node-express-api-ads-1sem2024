import userModel from "../../models/userModel.js"

const remove = async (req, res) => {
	const {id} = req.params
	const dataValidated = userModel.validateId(+id)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const usersResult = await userModel.remove(dataValidated.data.id)
	res.json({
		success: `Usuário ${id} removido com sucesso!`,
		users: usersResult
	})
}

export default remove