import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from '../utils/handlerFactory.js'

export const setPostUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id
  next()
}

export const setPostReceiverIds = (req, res, next) => {
  if (req.params.id) req.body.receiver = req.params.id
  next()
}

export const getAllPosts = getAll(Post, { path: 'user' })
export const getPost = getOne(Post, { path: 'user' })
export const createPost = createOne(Post)
export const updatePost = updateOne(Post)
export const deletePost = deleteOne(Post)
