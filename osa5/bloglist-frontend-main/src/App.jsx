import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
        const returnedBlog = await blogService.create(blogObject)
        setBlogs((prevBlogs) => [...prevBlogs, returnedBlog])
        setErrorMessage(null); // Clear error message if successful
        blogFormRef.current.toggleVisibility()
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setErrorMessage('This blog is already added')
        } else {
            setErrorMessage('An error occurred while adding the blog')
        }
    }
}


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} 
      setErrorMessage={setErrorMessage} setMessage={setMessage} />
    </Togglable>
    )


  return (
    <div>
      <Notification errorMessage={errorMessage} message={message} />
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged in <button type="submit">logout</button></p>
        </form>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user.username} />
        )}
      </div>
      }
    </div>
  )
}

export default App