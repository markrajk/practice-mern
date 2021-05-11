import axios from 'axios'
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  UPDATE_ME_REQUEST,
  UPDATE_ME_SUCCESS,
  UPDATE_ME_FAIL,
  USER_GET_ONE_REQUEST,
  USER_GET_ONE_SUCCESS,
  USER_GET_ONE_FAIL,
  USER_GET_ALL_REQUEST,
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAIL,
} from '../constants/userConstants'

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_ONE_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    const { data } = await axios.get(`/api/v1/users/${id}`)

    const user = data.data.data

    dispatch({
      type: USER_GET_ONE_SUCCESS,
      payload: user,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAllUsers = (queryStr) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_ALL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/v1/users${queryStr ? `?string=${queryStr}` : ''}`,
      config
    )

    const users = data.data.data

    dispatch({
      type: USER_GET_ALL_SUCCESS,
      payload: users,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signup = (firstName, lastName, email, password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/signup',
      { firstName, lastName, email, password },
      config
    )
    const token = data.token
    const user = data.data.user
    user.token = token

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: user,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    )

    const token = data.token
    const user = data.data.user
    user.token = token

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  await axios.get('/api/v1/users/logout')
}

export const updateMe = (firstName, lastName, email) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_ME_REQUEST,
    })

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
      '/api/v1/users/updateMe',
      { firstName, lastName, email },
      config
    )

    const user = data.data.user
    user.token = userInfo.token

    dispatch({
      type: UPDATE_ME_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: UPDATE_ME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
