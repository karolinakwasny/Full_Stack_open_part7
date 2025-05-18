import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const LogOutForm = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <form onSubmit={handleLogout}>
      {user.name} logged-in
      <button type="submit">logout</button>
    </form>
  )
}

export default LogOutForm
