const Blog = ({ blog, user }) => (
  <div>
    {user === blog.user.username && (
      <>
        {blog.title} {blog.author}
      </>
    )}
  </div>
)

export default Blog