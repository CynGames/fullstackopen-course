const lodash = require("lodash")

const dummy = (blogs) =>
{
  return 1
}

const totalLikes = (blogs) =>
{

  const reducer = (sum, likes, index, blogs) =>
  {
    return sum + blogs[index].likes
  }

  return blogs.reduce(reducer, 0, 0, blogs)
}

const favoriteBlog = (blogs) =>
{

  const reducer = (topBlog, currentBlog) =>
  {
    return topBlog = currentBlog.likes > topBlog.likes ? currentBlog : topBlog
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) =>
{

  let result = ""

  //element:count
  result = lodash.countBy(blogs, "author")

  //[[element, count],[...]]
  result = lodash.entries(result)

  //[topElement, count]
  result = lodash.maxBy(result)

  return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) =>
{
  const groupedByAuthor = lodash.groupBy(blogs, "author")
  const blogsByLikes = lodash.mapValues(groupedByAuthor, totalLikes)
  const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a,b) => a[1] > b[1] ? a : b)

  return { "author": mostLikedAuthor[0], "likes": mostLikedAuthor[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}