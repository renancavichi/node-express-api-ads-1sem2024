import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
		.url({message: 'Url do avatar inválido.'}),
	pass: z.string({
		invalid_type_error: 'O pass deve ser uma string.',
		required_error: 'Pass obrigatório.'
		})
		.min(6, {message: 'A senha deve ter no mínimo 6 caracteres.'})
	//add pass rules
})

const validateCreate = (user) =>{
	const partialUserSchema = userSchema.partial({id: true})
	return partialUserSchema.safeParse(user)
}

const validateEdit = (user) =>{
	const partialUserSchema = userSchema.partial({pass: true})
	return partialUserSchema.safeParse(user)
}

const validateId = (id) =>{
	const partialUserSchema = userSchema.partial({
		name: true,
		email: true,
		avatar: true,
		pass: true
	})
	return partialUserSchema.safeParse({id})
}

const list = async () => {
    return await prisma.user.findMany({
		select:{
			id: true,
			name: true,
			email: true,
			pass: false,
			avatar: true
		}
	})
}

const getById = async (id) => {
	return await prisma.user.findUnique({
		where: {
			id
		},
		select:{
			id: true,
			name: true,
			email: true,
			pass: false,
			avatar: true
		}
	})
}

const getByEmail = async (email) => {
	return await prisma.user.findUnique({
		where: {
			email
		}
	})
}

const create = async (user) =>{
    return await prisma.user.create({
		data: user
	})
}

const edit = async (newUser) => {
    return await prisma.user.update({
		where:{
			id: newUser.id
		},
		data: newUser,
		select:{
			id: true,
			name: true,
			email: true,
			pass: false,
			avatar: true
		}
	})
}

const remove = async (id) => {
    return await prisma.user.delete({
		where: {
			id
		}
	})
}

export default {list, create, edit, getByEmail, remove, validateCreate, validateEdit, validateId, getById} 