import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotificationTimeout } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
  },
})

export const { setBlog, appendBlog, removeBlog, likeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.createBlog(newBlog)
      dispatch(appendBlog(addedBlog))
      dispatch(
        setNotificationTimeout(
          `A new blog "${addedBlog.title}" by ${addedBlog.author} added`,
          true,
          5
        )
      )
    } catch (error) {
      const message = error.response.data.error || 'Failed to add blog'
      dispatch(setNotificationTimeout(message, false, 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotificationTimeout(`Blog "${blog.title}" removed`, true, 5))
    } catch (error) {
      const message =
        error.response.data.error ||
        `Failed to delete the "${blog.title}" blog `
      dispatch(setNotificationTimeout(message, false, 5))
    }
  }
}

export const like = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateBlog(id, blog)
    dispatch(likeBlog(likedBlog))
  }
}
export default blogSlice.reducer
