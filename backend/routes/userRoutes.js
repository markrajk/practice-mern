import express from 'express'
import { signup, login, logout } from '../controllers/authController.js'
import { getMe, getUser, updateMe } from '../controllers/userController.js'
import {
  setPostUserIds,
  setPostReceiverIds,
  createPost,
} from '../controllers/postController.js'
import { protect } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.get('/me', protect, getMe, getUser)
router.patch('/updateMe', protect, updateMe)

router.route('/:id').get(getUser)

router
  .route('/:id/posts')
  .post(protect, setPostUserIds, setPostReceiverIds, createPost)

export default router
