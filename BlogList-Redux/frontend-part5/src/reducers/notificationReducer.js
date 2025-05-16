import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  success: true,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      console.log('state', state.message, state.success)
      return {
        message: action.payload.message,
        success: action.payload.success,
      }
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { setMessage, clearNotification } = notificationSlice.actions

export const setNotificationTimeout = (message, success, time) => {
  return async (dispatch) => {
    console.log('message', message)
    console.log('success', success)
    const notification = {
      message: message,
      success: success,
    }
    dispatch(setMessage(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
