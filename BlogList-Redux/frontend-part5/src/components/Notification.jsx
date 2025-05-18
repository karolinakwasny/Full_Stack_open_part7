import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const success = useSelector((state) => state.notification.success)
  const notificationStyle = {
    color: success ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }
  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
