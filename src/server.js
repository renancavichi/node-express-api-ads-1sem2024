//const express = require('express')
import express from 'express'
import cookieParser from 'cookie-parser'
import {PORT, HOST} from './config.js'
import logger from './middlewares/logger.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import authRouter from './routers/authRouter.js'
import auth from './middlewares/auth.js'

const app = express()
app.disable('x-powered-by')

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(logger)

//routes
app.get('/', auth, (req, res) => {
  res.json({success: `Bem-vindo a API!`})
})

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/auth', authRouter)

//run server 
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`)
})