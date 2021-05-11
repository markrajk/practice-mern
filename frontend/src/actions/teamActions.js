import axios from 'axios'
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

export const getTeam = (teamId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_GET_ONE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/teams/${teamId}`, config)

    const team = data.data.data

    dispatch({ type: TEAM_GET_ONE_SUCCESS, payload: team })
  } catch (error) {
    dispatch({
      type: TEAM_GET_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTeam = (teamId, team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/api/v1/teams/${teamId}`,
      { ...team },
      config
    )

    const updatedTeam = data.data.data

    dispatch({ type: TEAM_UPDATE_SUCCESS, payload: updatedTeam })
  } catch (error) {
    dispatch({
      type: TEAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTeam = (team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/teams`, { ...team }, config)

    const newTeam = data.data.data

    dispatch({ type: TEAM_CREATE_SUCCESS, payload: newTeam })
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}