const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const { getUsersInDb, postUserInDb, mapUsers } = require("./api_helper")

describe("When there is initially one user in db", () =>
{
  beforeEach(async () =>
  {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("secret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("Creation fails with proper statuscode and message if name already been taken", async () =>
  {
    const usersAtStart = await mapUsers()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "SomeSecret"
    }

    const result = await postUserInDb().send(newUser).expect(400).expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("Username must be unique")

    const usersAtEnd = await mapUsers()
    expect(usersAtEnd).toStrictEqual(usersAtStart)
  })
})

test("Creation succeeds with a fresh name", async () =>
{
  const usersAtStart = await mapUsers()

  const newUser = {
    username: "EarthCrusher",
    name: "Franquito Voisard",
    password: "Unicornio"
  }

  await postUserInDb().send(newUser).expect(201).expect("Content-Type", /application\/json/)

  const usersAtEnd = await mapUsers()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const names = usersAtEnd.map(n => n.name)
  expect(names).toContain(newUser.name)
}, 100000)

test("Validation de errores al crear un usuario", async () =>
{
  const newUser = {
    username: "Seb",
    name: "Sebastian",
  }

  const response = await postUserInDb()
    .send(newUser)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(400)

  expect(response.body.error).toBe("Username or Password missing")

  const newUser2 = {
    username: "S",
    name: "Sebastian",
    password: "oiii"
  }

  const response2 = await postUserInDb()
    .send(newUser2)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(400)

  expect(response2.body.error).toBe("Username must be at least 3 characters long")
})