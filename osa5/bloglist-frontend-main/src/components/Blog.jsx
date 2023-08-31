import { useState } from "react"

const Blog = ({ blog, user }) => {
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
      {user === blog.user.username && (
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
               likes {blog.likes} <button type="submit">like</button>
               <br />
               {blog.user.name}
              </div>    
        </>
    </div>
      )}
    </div>
  )
}

export default Blog