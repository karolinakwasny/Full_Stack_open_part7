import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { like, deleteBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(like(blog.id, updatedBlog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userLoggedIn={user.name}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
        />
      ))}
    </>
  )
}

export default BlogList
