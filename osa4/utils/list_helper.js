const dummy = (blogs) => {
    return (
        1
    )
  }

  const totalLikes = (blogs) => {
    var totalAmount = blogs.reduce((sum, like) => sum + like.likes, 0)
    return totalAmount
  }


  
  module.exports = {
    dummy,
    totalLikes
  }