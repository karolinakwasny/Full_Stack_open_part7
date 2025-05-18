import { useEffect } from 'react'

import Notification from './components/Notification'
import LogInForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm'
import BlogList from './components/BlogList'
import CreateBlogTogglable from './components/CreateBlogTogglable'

import { useDispatch, useSelector } from 'react-redux'
import { restoreUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(restoreUser())
      dispatch(initializeBlogs())
    }
    init()
  }, [])

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
      <BlogList />
    </div>
  )
}

export default App
