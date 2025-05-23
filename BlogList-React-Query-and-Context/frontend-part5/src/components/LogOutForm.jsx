import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const LogOutForm = () => {
  const { user, clearUser } = useContext(UserContext)

  const handleLogout = async (event) => {
    event.preventDefault()
    clearUser()
  }

  return (
    <form onSubmit={handleLogout}>
      {user.name} logged-in
      <button type="submit">logout</button>
    </form>
  )
}

export default LogOutForm
