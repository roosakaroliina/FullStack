const _ = require('lodash');

const dummy = (blogs) => {
  return 1

}

const totalLikes = (blogs) => {
  var totalAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalAmount
}

const favoriteBlog = (blogs) => {
  let maxLikes = blogs[0].likes
  let mostLikes = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    const currentLikes = blogs[i].likes
    if (currentLikes > maxLikes) {
      maxLikes = currentLikes
      mostLikes = blogs[i]
    }
  }
  return mostLikes.title
}

const mostBlogs = (blogs) => {
  let blogCount = _.countBy(blogs, 'author')
  let maxBlogs = _.max(Object.values(blogCount))

  let author = _.findKey(blogCount, (count) => count === maxBlogs)

  return {
    'author': author,
    'blogs': maxBlogs
  }
}

const mostLikes = (blogs) => {
  let blogCount = _.groupBy(blogs, 'author')
  //console.log(blogCount)
  let mostLikes = 0
  let mostLikedAuthor = ''

  _.forEach(blogCount, (blogsByAuthor, author) => {
    const likesByAuthor = _.sumBy(blogsByAuthor, 'likes')
    if (likesByAuthor > mostLikes) {
      mostLikes = likesByAuthor
      mostLikedAuthor = author
    }
  })

  return {
    'author': mostLikedAuthor,
    'likes': mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}