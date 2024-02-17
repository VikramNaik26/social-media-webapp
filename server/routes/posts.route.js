import express from 'express'
import { getPosts, addPost } from '../controllers/posts.controller.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', addPost)

export default router
