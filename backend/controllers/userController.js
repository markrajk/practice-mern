import User from '../models/userModel.js'
import { getOne } from '../utils/handlerFactory.js'

export const getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

export const getUser = getOne(User)
