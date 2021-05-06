import express from 'express'
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  setPostUserIds,
} from '../controllers/postController.js'
import { protect } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(getAllPosts).post(protect, setPostUserIds, createPost)
router
  .route('/:id')
  .get(getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost)

export default router
