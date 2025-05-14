const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to start coding',
    author: 'John Doe',
    url: 'www.myBlog.com/howtostartcoding',
    likes: 7
  },
  {
    title: 'Growing up in Canada',
    author: 'Test Delete',
    url: 'www.myBlog.com/growingupincanada',
    likes: 1
  },
  {
    title: 'Traveling across the world',
    author: 'Noah Brown',
    url: 'www.myBlog.com/travelingacrosstheworld',
    likes: 10
  },
  {
    title: 'My culinary journey',
    author: 'Henry Miller',
    url: 'www.myBlog.com/myculinaryjourney',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, nonExistingId
}
