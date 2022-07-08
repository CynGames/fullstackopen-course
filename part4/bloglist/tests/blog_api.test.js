const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const { initialBlogs, getBlogsInDb, getSingleBlogInDb, postBlogInDb, deleteBlogInDb, updateBlogInDb } = require("./api_helper")

beforeEach(async () =>
{
  await Blog.deleteMany({})

  for (let i = 0; i < initialBlogs.length; i++)
  {
    const blog = initialBlogs[i]

    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("all initial blogs are loaded", async () =>
{
  const response = await getBlogsInDb()

  expect(response.body).toHaveLength(initialBlogs.length)
})

test("blogs are returned as json", async () =>
{
  await getBlogsInDb().expect(200).expect("Content-Type", /application\/json/)

}, 100000)

test("unique identifier property is named 'id'", async () =>
{
  const response = await getBlogsInDb()

  expect(response.body[0].id).toBeDefined()
})

test("POST request to /api/blogs is successful", async () =>
{
  const ValidBlog =
  {
    _id: "5a422aa71b54a676234d1725",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }

  await postBlogInDb().send(ValidBlog).expect(201).expect("Content-Type", /application\/json/)

  const response = await getBlogsInDb()

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test("Likes value is 0 if property is undefined", async () =>
{
  const testBlog = {
    id: "5a422bc61b54a676234d172",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  }

  await postBlogInDb().send(testBlog).expect(201).expect("Content-Type", /application\/json/)

  const response = await getBlogsInDb()

  expect(response.body[initialBlogs.length].likes).toBeDefined()
})

test("Should 400 (bad req) if title and url are missing from req data", async () =>
{
  const testBlog = {
    id: "5a422bc61b54a676234d122",
    author: "Robert Martin",
    likes: 0
  }

  await postBlogInDb().send(testBlog).expect(400)
})

test("should delete single blog", async () =>
{
  await deleteBlogInDb(initialBlogs[0]._id)

  const response = await getBlogsInDb()

  expect(response.body).toHaveLength(initialBlogs.length - 1)
})

test("should update single blog", async () =>
{
  const updatedBlog = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 777,
  }

  await updateBlogInDb(updatedBlog.id).send(updatedBlog)

  const response = await getBlogsInDb()

  expect(response.body[0]).toStrictEqual(updatedBlog)
})

test("should get a single blog", async () =>
{
  const desiredBlogState = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }

  const response = await getSingleBlogInDb(initialBlogs[0]._id)

  expect(response.body).toStrictEqual(desiredBlogState)
})

test.only("Should assign an author", async () =>
{
  const response = await getBlogsInDb()

  expect(response).toBeDefined(response.body[0].user)
})

test("verify if the POST /api/blogs only works when authorized", async () =>
{
  const blog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 9
  }

  const response = await api
    .post("/api/blogs")
    .send(blog)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(401)

  expect(response.body.error).toBe("jwt must be provided")
})

afterAll(() =>
{
  mongoose.connection.close()
})