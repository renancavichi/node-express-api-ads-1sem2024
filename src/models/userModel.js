import {users} from '../db-memory/users.js'
import { z } from 'zod'

const userSchema = z.object({
	id: z.number(),
	name: z.string().min(3).max(200),
	email: z.string().email(),
	avatar: z.string().url()
})

const validateCreate = (user) =>{
	const partialUserSchema = userSchema.partial({id: true})
	return partialUserSchema.safeParse(user)
} 

const list = () => {
    return users
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

export default {list, create, edit, remove, validateCreate} 