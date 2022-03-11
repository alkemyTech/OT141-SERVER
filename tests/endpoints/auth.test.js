/* eslint-disable */
const supertest = require('supertest');
const bcryptjs = require('bcryptjs');
const { createUser } = require('../helpers');
const app = require('../../app');

const server = app.listen(process.env.PORT_TEST);
const db = require('../../models');

const api = supertest(app);

/* beforeEach(async () => {
  await db.User.destroy({
    truncate: true,
  });

  const user = {
    firstName: 'user',
    lastName: 'test',
    email: 'usertest@test.com',
    password: 'Test123**',
  };

  await createUser(user);
}); */

describe('POST /auth/login', () => {
  test('The content-type of response should be aplication/json', async () => {
    const user = {
      email: 'usertest@test.com',
      password: 'Test123**',
    };
    await api
      .post('/auth/login')
      .expect('Content-type', /application\/json/);
    await api
      .post('/auth/login')
      .send(user)
      .expect('Content-type', /application\/json/);
  });

  test('Login of user that exist', async () => {
    const user = {
      email: 'usertest@test.com',
      password: 'Test123**',
    };

    const res = await api
      .post('/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('Login of user that not exist', async () => {
    const user = {
      email: 'test@test.com',
      password: 'Test123**',
    };

    const res = await api
      .post('/auth/login')
      .send(user)
      .expect(404);
  });

  test('should return "User logged in" with valid user', async () => {
    const user = {
      email: 'usertest@test.com',
      password: 'Test123**',
    };

    const res = await api
      .post('/auth/login')
      .send(user)
      .expect(200);

    expect(res.body.msg).toContain('User logged in');
  });

  test('should return http code 400 if not send email', async () => {
    const user = {
      email: '',
      password: 'Test123**',
    };

    await api
      .post('/auth/login')
      .send(user)
      .expect(404)
      .expect('Content-type', /application\/json/);
  });

  test('should return http code 400 if not send password', async () => {
    const user = {
      email: 'usertest@test.com',
      password: '',
    };

    await api
      .post('/auth/login')
      .send(user)
      .expect(400)
      .expect('Content-type', /application\/json/);
  });
});

afterAll(() => {
  server.close();
});
