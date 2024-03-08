import {users} from '../db-memory/users.js'
import { z } from 'zod'

const userSchema = z.object({
	id: z
		.number({
			invalid_type_error: 'O id deve ser numérico.',
			required_error: 'Id obrigatório.'
		}),
	name: z
		.string({
			invalid_type_error: 'O nome deve ser uma string.',
			required_error: 'Nome obrigatório.'
		})
		.min(3, {message: 'O nome do usuário deve ter ao menos 3 lestras.'})
		.max(200, {message: 'O nome do usuário deve ter no máximo 200 caracteres.'}),
	email: z
		.string({
			invalid_type_error: 'O email deve ser uma string.',
			required_error: 'Email obrigatório.'
		})
		.email({message: 'Email inválido.'}),
	avatar: z
		.string({
			invalid_type_error: 'O avatar deve ser uma string.',
			required_error: 'Avatar obrigatório.'
		})
		.url({message: 'Url do avatar inválido.'})
})

const validateCreate = (user) =>{
	const partialUserSchema = userSchema.partial({id: true})
	return partialUserSchema.safeParse(user)
}

const validateEdit = (user) =>{
	return userSchema.safeParse(user)
}

const validateId = (id) =>{
	const partialUserSchema = userSchema.partial({
		name: true,
		email: true,
		avatar: true
	})
	return partialUserSchema.safeParse({id})
}

const list = () => {
    return users
}

const getById = (id) => {
	return users.find(user => user.id === id)
}

const create = (user) =>{
    user.id = users[users.length - 1].id + 1
	users.push(user)
    return users
}

const edit = (newUser) => {
    return users.map(user => {
		if (user.id === newUser.id) {
			return {
				id: user.id,
				name: newUser.name || user.name,
				email: newUser.email || user.email,
				avatar: newUser.avatar || user.avatar
			}
		}
		return user
	})
}

const remove = (id) => {
    return users.filter(user => user.id !== id)
}

export default {list, create, edit, remove, validateCreate, validateEdit, validateId, getById} 