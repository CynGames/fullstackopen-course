const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

function signupValidation(body)
{
  const { username, password } = body

  if (username === undefined || password === undefined)
  {
    return "Username or Password missing"
  }
  else if (username.length < 3)
  {
    return "Username must be at least 3 characters long"
  }
  else if (password.length < 3)
  {
    return "Password must be at least 3 characters long"
  }

  return undefined
}

usersRouter.get("/", async (request, response) =>
{
  const users = await User.find({}).populate("blogs")
  response.json(users)
})

usersRouter.post("/", async (request, response) =>
{
  const validationMessage = signupValidation(request.body)
  if (validationMessage)
  {
    return response.status(400).send({ error: validationMessage })
  }

  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  return response.status(201).json(savedUser)
})

module.exports = usersRouter