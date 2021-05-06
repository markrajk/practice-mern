import axios from 'axios'
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from '../constants/postConstants'

export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const { data } = await axios.get('/api/v1/posts')

    const posts = data.data.data

    dispatch({ type: POST_LIST_SUCCESS, payload: posts })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPost = (message) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST })

    const {
      userLogin: { userInfo },
      postList: { posts },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/v1/posts/', { message }, config)

    const post = data.data

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: post,
    })
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
