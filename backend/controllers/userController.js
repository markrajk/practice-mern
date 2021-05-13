import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import { getOne, updateOne, getAll } from '../utils/handlerFactory.js'

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

export const getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error is user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        'This route is not for pasword updates. Please use /updateMyPassword',
        400
      )
    )
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  })
})

// export const getAllUsers = getAll(User, {
//   path: 'member',
//   options: { select: { name: 1 } },
//   // path: 'admin',
//   // options: { select: { name: 1 } },
//   path: 'owner',
//   options: { select: { name: 1 } },
// })
// export const getUser = getOne(User, {
//   path: 'member',
//   options: { select: { name: 1 } },
//   // path: 'admin',
//   // options: { select: { name: 1 } },
//   path: 'owner',
//   options: { select: { name: 1 } },
// })

export const getAllUsers = getAll(User, [
  { path: 'member' },
  { path: 'owner' },
  { path: 'admin' },
])
export const getUser = getOne(User, [
  { path: 'member' },
  { path: 'owner' },
  { path: 'admin' },
])
export const updateUser = updateOne(User)
