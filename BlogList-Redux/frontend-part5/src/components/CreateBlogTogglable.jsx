import { useRef } from 'react'
import Togglable from './Toggable'
import CreateBlogForm from './CreateBlogForm'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const CreateBlogTogglable = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog))
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <CreateBlogForm addNewBlog={addNewBlog} />
    </Togglable>
  )
}

export default CreateBlogTogglable
