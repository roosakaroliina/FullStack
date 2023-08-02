const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('blogs have an identifier field called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('the first blog is written by Rose Griffin', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe('Rose Griffin')
})


afterAll(async () => {
  await mongoose.connection.close()
})