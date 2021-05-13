import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userSignupReducer,
  userLoginReducer,
  updateMeReducer,
  getUserReducer,
  getAllUserReducer,
  updateUserReducer,
} from './reducers/userReducers'
import {
  postListReducer,
  createPostReducer,
  getPostReducer,
  deletePostReducer,
  updatePostReducer,
} from './reducers/postReducers'
import {
  createCommentReducer,
  updateCommentReducer,
  deleteCommentReducer,
} from './reducers/commentReducers'
import {
  createTeamReducer,
  getTeamReducer,
  updateTeamReducer,
  deleteTeamReducer,
} from './reducers/teamReducers'

const reducer = combineReducers({
  userSignup: userSignupReducer,
  userLogin: userLoginReducer,
  updateMe: updateMeReducer,
  updateUser: updateUserReducer,
  getUser: getUserReducer,
  getAllUser: getAllUserReducer,
  postList: postListReducer,
  createPost: createPostReducer,
  getPost: getPostReducer,
  deletePost: deletePostReducer,
  updatePost: updatePostReducer,
  createComment: createCommentReducer,
  updateComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
  getTeam: getTeamReducer,
  createTeam: createTeamReducer,
  updateTeam: updateTeamReducer,
  deleteTeam: deleteTeamReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
