import {
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_SUCCESS,
  TEAM_CREATE_FAIL,
  TEAM_GET_ONE_REQUEST,
  TEAM_GET_ONE_SUCCESS,
  TEAM_GET_ONE_FAIL,
  TEAM_UPDATE_REQUEST,
  TEAM_UPDATE_SUCCESS,
  TEAM_UPDATE_FAIL,
} from '../constants/teamConstants'

export const getTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_GET_ONE_REQUEST:
      return { loading: true }
    case TEAM_GET_ONE_SUCCESS:
      return { loading: false, team: action.payload }
    case TEAM_GET_ONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_CREATE_REQUEST:
      return { loading: true }
    case TEAM_CREATE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_UPDATE_REQUEST:
      return { loading: true }
    case TEAM_UPDATE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
