import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const success = useSelector((state) => state.notification.success)

  console.log('message in component', message)
  console.log('success status in component', success)
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: success ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
