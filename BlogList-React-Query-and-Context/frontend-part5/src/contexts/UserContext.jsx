import PropTypes from 'prop-types'
import { createContext, useReducer, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationDispatch } from './useNotification'
import { isTokenExpired } from '../utils/tokenUtils'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  const notifyAndDispatch = useNotificationDispatch()

  useEffect(() => {
    restoreUser()
  }, [])

  const setUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      const message = error.response.data.error || 'Wrong username or password'
      notifyAndDispatch({ type: 'SET_NOTIFICATION', payload: [message, false] })
    }
  }

  const clearUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'CLEAR_USER' })
  }

  const restoreUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const expired = isTokenExpired(user.token)

      if (expired) {
        clearUser()
      } else {
        blogService.setToken(user.token)
        userDispatch({ type: 'SET_USER', payload: user })
      }
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, restoreUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
