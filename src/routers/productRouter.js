import express from 'express'
import {products} from '../db-memory/products.js'

const router = express.Router()

router.get('/', (req, res) => {
	res.json({
		success: "Produtos listados com sucesso!",
		products
	})
})

router.post('/', (req, res) => {
	const product = req.body
	product.id = products[products.length - 1].id + 1
	products.push(product)
	res.json({
		success: "Produto adicionado com sucesso!",
		products
	})
})

router.delete('/', (req, res) => {
	const id = req.body.id
	const productsResult = products.filter(product => product.id !== id)
	res.json({
		success: `Produto ${id} removido com sucesso!`,
		productsResult
	})
})

router.put('/', (req, res) => {
	const newProduct = req.body
	const productsResult = products.map(product => {
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
	res.json({
    success: `Produto ${newProduct.id} atualizado com sucesso!`,
    productsResult
  })
})

export default router