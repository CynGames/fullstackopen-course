const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) =>
{
  const blogs = await Blog.find({}).populate("user")

  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) =>
{
  const blog = await Blog.findById(request.params.id)

  response.json(blog)
})

// const getTokenFrom = request =>
// {
//   const authorization = request.get("authorization")

//   if (authorization && authorization.toLowerCase().startsWith("bearer "))
//   {
//     return authorization.substring(7)
//   }

//   return null
// }

blogsRouter.post("/", async (request, response) =>
{
  const { title, author, likes, url } = request.body

  if (!url || !title) return response.status(400).json({ error: "title or url is missing" })

  const user = request.user

  const blog = new Blog({
    title,
    author,
    likes,
    url,
    user: user._id
  })

  await blog.save()

  response.status(201).json(blog)
})

blogsRouter.delete("/:id", async (request, response) =>
{
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === request.user)
  {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else
  {
    response.status(401).json({
      error: "Access not authorized"
    })
  }
})

blogsRouter.put("/:id", async (request, response) =>
{
  const body = request.body

  const updatedBlog = {
    likes: body.likes,
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })

  response.status(200).json(blog)
})

module.exports = blogsRouter