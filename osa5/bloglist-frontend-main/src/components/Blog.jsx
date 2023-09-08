import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, increaseLike, removeBlog }) => {
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


  return (
    <div>
      <div style={blogStyle}>

        <div style={hideWhenVisible} className='blogTitleAndAuthor'>
          {blog.title} {blog.author} <button onClick={() => setInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible} className='otherInfo'>
          {blog.title} {blog.author} <button onClick={() => setInfoVisible(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes: {blog.likes} <button className='like' onClick={() => increaseLike(blog)}>like</button>
          <br />
          added by {blog.user.name ? blog.user.name : user.name}
          {blog.user.name === user.name && (
            <form onClick={() => removeBlog(blog)}>
              <button type="submit">remove</button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
//   blogs: PropTypes.array.isRequired,
//   setBlogs: PropTypes.func.isRequired,
//   removeBlog: PropTypes.func.isRequired
// }

export default Blog