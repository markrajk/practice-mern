import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userSignupReducer,
  userLoginReducer,
  updateMeReducer,
} from './reducers/userReducers'
import { postListReducer, createPostReducer } from './reducers/postReducers'

const reducer = combineReducers({
  userSignup: userSignupReducer,
  userLogin: userLoginReducer,
  updateMe: updateMeReducer,
  postList: postListReducer,
  createPost: createPostReducer,
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
