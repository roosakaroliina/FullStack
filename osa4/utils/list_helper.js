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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}