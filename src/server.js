//const express = require('express')
import express from 'express'
import {PORT, HOST} from './config.js'
import logger from './middlewares/logger.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'

const app = express()

//middleware
app.use(express.json())
app.use(logger)

//routes
app.get('/', (req, res) => {
  res.json({success: "Bem-vindo a API!"})
})

app.use('/user', userRouter)
app.use('/product', productRouter)

//run server 
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`)
})