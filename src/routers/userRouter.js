import express from 'express'
import listAll from '../controllers/user/listAll.js'
import create from '../controllers/user/create.js'
import remove from '../controllers/user/remove.js'
import edit from '../controllers/user/edit.js'
import getById from '../controllers/user/getById.js'

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', edit)

export default router