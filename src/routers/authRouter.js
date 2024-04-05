import express from 'express'
import login from '../controllers/auth/login.js'
import refreshToken from '../controllers/auth/refreshToken.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', ()=>{})
router.post('/refresh-token', refreshToken)

export default router