import Team from '../models/teamModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from '../utils/handlerFactory.js'

// export const updateTeam = catchAsync(async (req, res, next) => {
//   const team = await Team.find(req.params.id)
// })

export const getAllTeams = getAll(Team, [
  { path: 'members' },
  { path: 'admins' },
])
export const getTeam = getOne(Team, [
  { path: 'members' },
  { path: 'admins' },
  { path: 'owner' },
])
export const createTeam = createOne(Team)
export const updateTeam = updateOne(Team)
export const deleteTeam = deleteOne(Team)
