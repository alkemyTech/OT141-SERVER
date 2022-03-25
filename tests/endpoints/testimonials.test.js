/* eslint-disable */
const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const testimonyHelper = require('../testimonials.test.helpers');
const { ROLE_ADMIN, ROLE_USER } = require('../../constants/user.constants');

const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

const configUsers = [
  {
    roleId: ROLE_ADMIN,
    quantity: 1,
    firstName: 'User',
    lastName: 'Admin',
    email: 'admin',
  },
  {
    roleId: ROLE_USER,
    quantity: 1,
    firstName: 'User',
    lastName: 'Regular',
    email: 'user',
  },
];

beforeEach(async () => {
  await db.User.destroy({
    truncate: true,
  });
  await db.Testimony.destroy({
    truncate: true,
  });
  await testimonyHelper.createUsers(configUsers);
  await testimonyHelper.createTestimonials();
});

describe('POST /testimonials', () => {
  it('It should return 403, token is required', async () => {
    const { text: message } = await api.post('/testimonials')
      .expect(403)
      .expect("Content-Type", /application\/json/);
    expect(message).toContain('A token is required for authentication');
  });

  it('It should return 401 when creating testimony as regular user', async () => {
    const user = {
      email: 'user1@test.com',
      password: 'user1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const testimony = {
      name: 'Testimony name',
      content: 'Testimony Content'
    }
    await api
      .post("/testimonials")
      .send(testimony)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  it('It should return 422 when validations fail', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const testimony = {
      name: 'Testimony name',
    }
    await api
      .post("/testimonials")
      .send(testimony)
      .auth(token, { type: "bearer" })
      .expect(422)
      .expect("Content-Type", /application\/json/);
  });

  it('It should return 201 when testimony successfully created', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newTestimony = {
      name: 'Testimony name',
      content: 'Testimony Content'
    };
    const { body } = await await api
      .post("/testimonials")
      .send(newTestimony)
      .auth(token, { type: "bearer" })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(body.data.name).toBe(newTestimony.name)
    expect(body.data.content).toBe(newTestimony.content)
  });
});

describe('PUT /testimonials/:id', () => {
  it('It should return 403, token is required', async () => {
    const { text: message } = await api.post('/testimonials').expect(403);
    expect(message).toContain('A token is required for authentication');
  });

  it('It should return 404 testimony not found', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newTestimonyData = {
      name: 'New Testimony name',
      content: 'New Testimony Content'
    }
    await api
      .put("/testimonials/99999")
      .send(newTestimonyData)
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  it('It should return 401 when updating an testimony as regular user', async () => {
    const user = {
      email: 'user1@test.com',
      password: 'user1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newTestimonyData = {
      name: 'Updated Testimony Name',
      content: 'Updated Testimony Content'
    }
    await api
      .put("/testimonials/1")
      .send(newTestimonyData)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  it('It should return 200 when updating an testimony successfully', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newTestimonyData = {
      name: 'Updated Testimony Name',
      content: 'Updated Testimony Content'
    }
    const { body } = await api
      .put("/testimonials/1")
      .send(newTestimonyData)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(body.data.name).toBe(newTestimonyData.name)
  });
});

afterAll(() => {
  server.close();
});
