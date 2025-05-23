import React, { useContext } from 'react'
import Blog from './Blog'
import BlogContext from '../contexts/BlogContext'

const Blogs = () => {
  const { blogs, likeBlog, removeBlog } = useContext(BlogContext)

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={likeBlog}
            handleRemove={removeBlog}
          />
        ))}
    </div>
  )
}

export default Blogs
