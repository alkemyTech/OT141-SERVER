/* eslint-disable */
const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const activitieHelper = require('../activities.test.helpers');
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
  await db.Activity.destroy({
    truncate: true,
  });
  await activitieHelper.createUsers(configUsers);
  await activitieHelper.createActivities();
});

describe('POST /activities', () => {
  it('It should return 403, token is required', async () => {
    const { text: message } = await api.post('/activities').expect(403);
    expect(message).toContain('A token is required for authentication');
  });

  it('It should return 401 when creating activity as regular user', async () => {
    const user = {
      email: 'user1@test.com',
      password: 'user1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const activity = {
      name: 'Activity',
      content: 'Activity Content'
    }
    await api
      .post("/activities")
      .send(activity)
      .auth(token, { type: "bearer" })
      .expect(401)
  });

  it('It should return 422 when validations fail', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const activity = {
      name: 'Activity',
    }
    await api
      .post("/activities")
      .send(activity)
      .auth(token, { type: "bearer" })
      .expect(422)
  });

  it('It should return 201 when activity successfully created', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const activity = {
      name: 'Activity',
      content: 'Activity Content'
    }
    await api
      .post("/activities")
      .send(activity)
      .auth(token, { type: "bearer" })
      .expect(201)
      .expect("Content-Type", /json/);
  });
});

describe('PUT /activities/:id', () => {
  it('It should return 403, token is required', async () => {
    const { text: message } = await api.post('/activities').expect(403);
    expect(message).toContain('A token is required for authentication');
  });

  it('It should return 404 activity not found', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newActivityData = {
      name: 'Updated Activity',
      content: 'Updated Activity Content'
    }
    await api
      .put("/activities/99999")
      .send(newActivityData)
      .auth(token, { type: "bearer" })
      .expect(404)
  });

  it('It should return 401 when updating an activity as regular user', async () => {
    const user = {
      email: 'user1@test.com',
      password: 'user1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newActivityData = {
      name: 'Updated Activity',
      content: 'Updated Activity Content'
    }
    await api
      .put("/activities/1")
      .send(newActivityData)
      .auth(token, { type: "bearer" })
      .expect(401)
  });

  it('It should return 200 when updating an activity successfully', async () => {
    const user = {
      email: 'admin1@test.com',
      password: 'admin1',
    };
    const { body: {token} } = await api.post('/auth/login').send(user);
    const newActivityData = {
      name: 'Updated Activity',
      content: 'Updated Activity Content'
    }
    const { body } = await api
      .put("/activities/1")
      .send(newActivityData)
      .auth(token, { type: "bearer" })
      .expect(200)
    expect(body.data.name).toBe(newActivityData.name)
  });
});

afterAll(() => {
  server.close();
});
