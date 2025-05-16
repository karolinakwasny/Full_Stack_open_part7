import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateNewBlog from './components/CreateBlog'
import LogInForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm'
import Togglable from './components/Toggable'
import { setNotificationTimeout } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000 // current time in seconds
      return payload.exp < now
    } catch (error) {
      console.error('Failed to decode token', error)
      return true // Treat as expired if something goes wrong
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const expired = isTokenExpired(user.token)

      if (expired) {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      } else {
        setUser(user)
        blogService.setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    if (newBlog.author !== user.name) {
      dispatch(
        setNotificationTimeout(
          'You can only add blogs with your own name',
          false,
          5
        )
      )
    } else {
      blogService
        .createBlog(newBlog)
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog))
          dispatch(
            setNotificationTimeout(
              `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
              true,
              5
            )
          )
        })
        .catch((error) => {
          const errorMessage = error.response.data.error
          dispatch(setNotificationTimeout(errorMessage, false, 5))
        })
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog)
    setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)))
  }

  const handleRemove = (blog) => {
    const title = blog.title
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(setNotificationTimeout(`Blog ${title} removed`, true, 5))
      })
    }
  }

  const createBlog = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <CreateNewBlog addBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        <LogInForm setUser={setUser} />
      </div>
    )
  } else if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <LogOutForm user={user} setUser={setUser} />
        {createBlog()}
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              userLoggedIn={user.name}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    )
  }
}

export default App
