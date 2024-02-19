import express from 'express'
import { getUser, updateUser, getAllUser } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/find/:userId', getUser)
router.get('/findAll/:userId', getAllUser)
router.put('/', updateUser)

export default router
