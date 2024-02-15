//const express = require('express')
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({message: "Olá Mundo!"})
})

app.get('/produto', (req, res) => {
    res.json({message: "Rota de Produto!"})
  })

app.listen(port, () => {
  console.log(`Servidor rodando na PORTA http://localhost:${port}`)
})