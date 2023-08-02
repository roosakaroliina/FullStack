const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('the first blog is written by Michael Chan', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe('Michael Chan')
})

test('blogs have an identifier field called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('Blogs can be added by HTTP POST request', async () => {
  const newBlog = {
    title: 'Autumn without you',
    author: 'Emma Thompson',
    url: 'http://emmasdiary.blogger.fi/autumnwithoutyou',
    likes: 53
  }

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})