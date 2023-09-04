import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, blogs, setBlogs, removeBlog }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // siirrä tämä App.js
  const increaseLike = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(updatedBlog)
    blogService.update(updatedBlog.id, updatedBlog)
    const updatedBlogs = blogs.map((a) =>
      a.id === updatedBlog.id ? updatedBlog : a)
    setBlogs(updatedBlogs)
    console.log(updatedBlogs)
  }

  const deleteBlog = () => removeBlog(blog)

  return (
    <div>
      <div style={blogStyle}>
        <>
          <div style={hideWhenVisible}>
            {blog.title} {blog.author} <button onClick={() => setInfoVisible(true)}>view</button>
          </div>
          <div style={showWhenVisible}>
            {blog.title} {blog.author} <button onClick={() => setInfoVisible(false)}>hide</button>
            <br />
            {blog.url}
            <br />
            <form onSubmit={increaseLike}>
              likes: {blog.likes} <button type="submit">like</button>
            </form>
            added by {blog.user.name ? blog.user.name : user.name}
            {blog.user.name === user.name && (
              <form onSubmit={deleteBlog}>
                <button type="submit">remove</button>
              </form>
            )}
          </div>
        </>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog