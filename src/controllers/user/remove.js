import userModel from "../../models/userModel.js"

const remove = (req, res) => {
	const id = req.body.id
	const usersResult = userModel.remove(id)
	res.json({
		success: `Usuário ${id} removido com sucesso!`,
		users: usersResult
	})
}

export default remove