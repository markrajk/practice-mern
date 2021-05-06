import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate(popOptions)
    const document = await query
    if (!document) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    })
  })

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!document) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    })
  })
