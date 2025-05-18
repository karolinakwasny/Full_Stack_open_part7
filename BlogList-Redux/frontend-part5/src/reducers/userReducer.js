import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'
import { isTokenExpired } from '../utils/tokenUtils'
import { setNotificationTimeout } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      const message = error.response.data.error || 'Wrong username or password'
      dispatch(setNotificationTimeout(message, false, 5))
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }
}

export const restoreUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const expired = isTokenExpired(user.token)

      if (expired) {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(clearUser())
      } else {
        dispatch(setUser(user))
        blogService.setToken(user.token)
      }
    }
  }
}
export default userSlice.reducer
