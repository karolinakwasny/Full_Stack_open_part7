import { useNotificationValues } from '../contexts/useNotification'

const Notification = () => {
  const notification = useNotificationValues()
  const notificationStyle = {
    color: notification[0].success ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification[0].message === null) {
    return null
  }
  return (
    <div className="notification" style={notificationStyle}>
      {notification[0].message}
    </div>
  )
}

export default Notification
