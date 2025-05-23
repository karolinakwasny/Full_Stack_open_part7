import { useContext } from 'react'

import Notification from './components/Notification'
import LogInForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm'
import CreateBlogTogglable from './components/CreateBlogTogglable'
import Blogs from './components/Blogs'

import UserContext from './contexts/UserContext'

const App = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    return (
      <div>
        <Notification />
        <LogInForm />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogOutForm />
      <CreateBlogTogglable />
      <Blogs />
    </div>
  )
}

export default App
