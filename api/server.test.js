const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const supertest = require('supertest')


const userA = { username: 'biff', password: 'baff' }


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})


test('sanity', () => {
  expect(true).toBe(true)
})


// describe('test register user endpoint before implementation', () => {
//   it('sends message before implementation', async () => {
//     const res = await supertest(server).post('/api/auth/register')

//     expect(res.statusCode).toBe(200)
//   })
// })

describe('test register user endpoint after implementation', () => {
  it('creates a new user returning 201', async () => {
    const res = await supertest(server)
    .post('/api/auth/register')
    .send(userA)
    const user = await db('users').first()
    expect(res.statusCode).toBe(201)
  
  })
  it('responds with a user having id and username and password', async () => {
    const res = await supertest(server)
    .post('/api/auth/register')
    .send(userA)
      const user = await db('users').first()
      expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('password')
        expect(user.username).toBe('biff')
  })
})


describe('test login endpoint', () => {
it('allows registered user to login', async () => {
const res = await supertest(server)
.post('/api/auth/login')
.send(userA)

expect(res.statusCode).toBe(200)
})

it('includes token in response', async () => {
  const res = await supertest(server)
  .post('/api/auth/login')
  .send(userA)

  expect(res.body).toHaveProperty('token')
})

})





describe('jokes endpoint tests', () => {
it('returns an error when sent without token', async () => {
  const res = await supertest(server).get('/api/jokes')

  expect(res.statusCode).toBe(401)
})

  // it('gets list of jokes when authorized', async () => {
  //   const res = await supertest(server).get('/api/jokes')

  //   expect(res.statusCode).toBe(200)
  //   expect(res.type).toBe('application/json')
  //   // console.log('res.body: ', res.body)
  //   expect(res.body.length).toBe(3)
  // })
})
