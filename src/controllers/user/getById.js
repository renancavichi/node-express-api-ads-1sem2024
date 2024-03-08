import userModel from "../../models/userModel.js"

const getById = (req, res) => {
	const id = +req.params.id
	const dataValidated = userModel.validateId(id)
	if(!dataValidated.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: dataValidated.error.flatten().fieldErrors
		})
	}
	const userResult = userModel.getById(dataValidated.data.id)
	res.json({
		success: `Usuário ${id} encontrado com sucesso!`,
		user: userResult
	})
}

export default getById