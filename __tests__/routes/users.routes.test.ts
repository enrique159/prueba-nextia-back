import request from 'supertest'

import app from '.././../src/server'

describe('User routes', () => {
  test('Create a user', async() => {
    const response = await request(app).post('/users/signup').send({
      name: 'John Doe',
      lastname: 'Doe',
      email: 'testing@mail.com',
      password: '12345678',
      department: 1,
    })
    expect(response.status).toBe(201)
  })
})