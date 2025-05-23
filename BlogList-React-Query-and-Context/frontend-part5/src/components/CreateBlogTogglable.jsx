import { useContext, useRef } from 'react'
import BlogContext from '../contexts/BlogContext'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const CreateBlogTogglable = () => {
  const blogFormRef = useRef()
  const { addNewBlog } = useContext(BlogContext)

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    addNewBlog(newBlog)
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateNewBlog addBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default CreateBlogTogglable
