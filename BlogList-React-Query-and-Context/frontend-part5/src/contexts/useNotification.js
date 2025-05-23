import { useContext } from 'react'
import NotificationContext from './NotificationContext'

export const useNotificationValues = () => {
  const notification = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [state, dispatch] = useContext(NotificationContext)
  return (payload) => {
    dispatch({
      type: payload.type,
      payload: payload.payload,
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }
}
