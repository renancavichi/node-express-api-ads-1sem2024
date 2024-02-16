//const express = require('express')
import express from 'express'
import {PORT, HOST} from './config.js'
import {users} from './db-memory/user.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Bem-vindo a API!"})
})

app.get('/user', (req, res) => {
  res.json({
    success: "Usuários listados com sucesso!",
    users
  })
})

app.post('/user', (req, res) => {
  const user = req.body
  user.id = users[users.length - 1].id + 1 
  users.push(user)
  res.json({
    success: "Usuários listados com sucesso!",
    users
  })
})


app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`)
})