import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'

const initialState = {
  message: null,
  success: true,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return {
        message: action.payload[0],
        success: action.payload[1],
      }
    }
    case 'CLEAR_NOTIFICATION': {
      return initialState
    }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationContext
