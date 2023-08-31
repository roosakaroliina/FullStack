import { useState } from 'react'

const BlogForm = ({ createBlog, setMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    
    }
    return (
        <div>
            <form onSubmit={addBlog}>
                <h2>create new blog</h2>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <button type="submit">create</button>

            </form>
        </div>
    )
}


export default BlogForm