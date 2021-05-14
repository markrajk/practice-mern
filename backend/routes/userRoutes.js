import express from 'express'
import { signup, login, logout } from '../controllers/authController.js'
import {
  getMe,
  getUser,
  updateMe,
  updateUser,
  getAllUsers,
} from '../controllers/userController.js'
import { createPost } from '../controllers/postController.js'

import {
  protect,
  setUserIds,
  setSenderIds,
  setReceiverIds,
  restrictToTeamRoles,
} from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.get('/me', protect, getMe, getUser)
router.patch('/updateMe', protect, updateMe)

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(protect, updateUser)

router.route('/:id/posts').post(protect, setUserIds, setReceiverIds, createPost)

export default router
