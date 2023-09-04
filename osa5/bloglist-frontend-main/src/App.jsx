import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Login from './components/LoginForm'
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

  // blogit suuruusjärjestykseen tykkäysmäärän mukaan
  blogs.sort((a, b) => b.likes - a.likes)

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then((returnedBlog) => {
        console.log(returnedBlog)
        setBlogs([...blogs, returnedBlog])
      })
      .catch((error) => {
        setErrorMessage('An error occurred while adding the blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (window.confirm(`Delete blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
        blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter((b) => b.id !== blogToRemove.id))
        setMessage(`Blogpost ${blogToRemove.title} is now removed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (error) {
      setErrorMessage('Could not delete')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const LoginForm = () => {
    return (
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} message={message} />
      {!user && LoginForm()}
      {user && <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged in <button type="submit">logout</button></p>
        </form>
        <Togglable buttonLabel="new blog" ref={blogFormRef} >
          <BlogForm createBlog={addBlog} setMessage={setMessage} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            blogs={blogs} setBlogs={setBlogs} removeBlog={removeBlog} />
        )}
      </div>
      }
    </div>
  )
}

export default App