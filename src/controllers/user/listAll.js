import userModel from "../../models/userModel.js"

const listAll = async (req, res) => {
	res.json({
		success: "Usuários listados com sucesso!",
		users: await userModel.list()
	})
}

export default listAll