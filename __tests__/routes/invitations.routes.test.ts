import request from 'supertest'

import app from '.././../src/server'

describe('Invitation routes', () => {
  test('Get Invitations', async() => {
    const response = await request(app).get('/invitations').send()
    expect(response.status).toBe(401)
  })
})