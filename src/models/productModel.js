import {products} from '../db-memory/products.js'

const list = () => {
    return products
}

const create = (product) =>{
    product.id = products[products.length - 1].id + 1
	products.push(product)
    return products
}

const edit = (newProduct) => {
    return products.map(product => {
		if (product.id === newProduct.id) {
			return {
				id: product.id,
				name: newProduct.name || product.name,
				value: newProduct.value || product.value,
				category: newProduct.category || product.category,
				photo: newProduct.photo || product.photo
			}
		}
		return product
	})
}

const remove = (id) => {
    return products.filter(product => product.id !== id)
}

export default {list, create, edit, remove} 