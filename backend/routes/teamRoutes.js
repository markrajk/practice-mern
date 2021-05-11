import express from 'express'
import {
  protect,
  setOwnerIds,
  restrictToTeamRoles,
} from '../middlewares/authMiddlewares.js'
import {
  createTeam,
  getTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
} from '../controllers/teamController.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getAllTeams).post(setOwnerIds, createTeam)

router
  .route('/:id')
  .get(restrictToTeamRoles('member', 'admin', 'owner'), getTeam)
  .patch(restrictToTeamRoles('admin', 'owner'), updateTeam)
  .delete(restrictToTeamRoles('owner'), deleteTeam)

export default router
