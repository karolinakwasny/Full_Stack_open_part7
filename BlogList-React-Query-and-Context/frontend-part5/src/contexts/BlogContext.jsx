import PropTypes from 'prop-types'
import { createContext, useReducer, useEffect } from 'react'
import blogService from '../services/blogs'
import { useNotificationDispatch } from './useNotification'
import { removeBlog } from '../../../../BlogList-Redux/frontend-part5/src/reducers/blogReducer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOG':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    default:
      return state
  }
}

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(blogReducer, [])
  const notifyAndDispatch = useNotificationDispatch()

  useEffect(() => {
    initializeBlogs()
  }, [])

  const initializeBlogs = async () => {
    const blogs = await blogService.getAll()
    blogDispatch({ type: 'SET_BLOG', payload: blogs })
  }

  const addNewBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.createBlog(newBlog)
      blogDispatch({ type: 'ADD_BLOG', payload: addedBlog })
      notifyAndDispatch({
        type: 'SET_NOTIFICATION',
        payload: [
          `A new blog "${addedBlog.title}" by ${addedBlog.author} added`,
          true,
        ],
      })
    } catch (error) {
      const message = error.response.data.error || 'Failed to add blog'
      notifyAndDispatch({
        type: 'SET_NOTIFICATION',
        payload: [message, false],
      })
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog)
    blogDispatch({ type: 'LIKE_BLOG', payload: returnedBlog })
  }

  const removeBlog = async (blog) => {
    const title = blog.title
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        blogDispatch({ type: 'REMOVE_BLOG', payload: blog.id })
        notifyAndDispatch({
          type: 'SET_NOTIFICATION',
          payload: [`Blog "${title}" removed`, true],
        })
      } catch (error) {
        const message = error.response.data.error || 'Failed to remove blog'
        notifyAndDispatch({
          type: 'SET_NOTIFICATION',
          payload: [message, false],
        })
      }
    }
  }

  return (
    <BlogContext.Provider
      value={{ blogs, initializeBlogs, addNewBlog, likeBlog, removeBlog }}
    >
      {props.children}
    </BlogContext.Provider>
  )
}

BlogContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlogContext
