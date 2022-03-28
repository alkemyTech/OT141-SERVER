/* eslint-disable */
const app = require("../../app");
const supertest = require("supertest");
const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

const USER_REGULAR = { email: "user1-test@test.com", password: "user1" };
const OTHER_USER_REGULAR = { email: "user2-test@test.com", password: "user2" };
const USER_ADMIN = { email: "admin1-test@test.com", password: "admin1" };

const { createUser } = require("../auth.test.helpers");
const db = require("../../models");
const { ROLE_ADMIN, ROLE_USER } = require("../../constants/user.constants");

let userRegularCreated;
let otherUserRegularCreated;
let userAdminCreated;

beforeEach(async () => {
  try {
    await db.User.destroy({
    truncate: true,
  });

  const userRegular = {
    firstName: "user",
    lastName: "test",
    roleId: ROLE_USER,
    ...USER_REGULAR,
  };
  const otherUserRegular = {
    firstName: "user",
    lastName: "test",
    roleId: ROLE_USER,
    ...OTHER_USER_REGULAR,
  };
  const userAdmin = {
    firstName: "admin",
    lastName: "test",
    roleId: ROLE_ADMIN,
    ...USER_ADMIN,
  };

  userRegularCreated = await createUser(userRegular);
  otherUserRegularCreated = await createUser(otherUserRegular);
  userAdminCreated = await createUser(userAdmin);
  } catch (error) {
    console.log(error)
  }
});

describe("GET /users", () => {
  it("Response Not Found - example: /user", async () => {
    await api.get("/user").expect(404).expect("Content-Type", /json/);
  });

  it("It should return a successful response with all users", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { message, users },
    } = await api
      .get("/users")
      .auth(token, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(message).toContain("list of users");
    expect(users).toHaveLength(3);
  });

  it("It should return a response that you do not have permission to this resource", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: { errors },
    } = await api
      .get("/users")
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);

    expect(errors.msg).toContain(
      "You do not have permissions for this resource"
    );
  });

  it("It should return that the token is required", async () => {
    const {
      body: { error },
    } = await api.get("/users").expect(403).expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const {
      body: { error },
    } = await api
      .get("/users")
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });
});

describe("PATCH /users/:id", () => {
  it("Response Not Found - example: /api/users", async () => {
    await api.patch("/api/users").expect(404).expect("Content-Type", /json/);
  });

  it("Response User Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { msg },
    } = await api
      .patch("/users/100000")
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(msg).toContain("user not found");
  });

  it("User update successful", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const userPatch = {
      firstName: "adminName1",
      lastName: "adminLast1",
      photo: "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png",
    };
    const {
      body: { message, user },
    } = await api
      .patch(`/users/${userAdminCreated.id}`)
      .auth(token, { type: "bearer" })
      .send(userPatch)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(message).toContain("user updated successfully");
    expect(user.firstName).toContain(userPatch.firstName);
  });

  it("A regular user should be prevented from updating information", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: { ok, msg },
    } = await api
      .patch(`/users/${userAdminCreated.id}`)
      .auth(token, { type: "bearer" })
      .expect(403)
      .expect("Content-Type", /json/);

    expect(ok).toBeFalsy();
    expect(msg).toContain("Access Forbidden");
  });

  it("It should return 422 when validations fail", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const userPatch = {
      firstName: 123,
      lastName: 123,
      image: 123,
    };

    const {
      body: { errors },
    } = await api
      .patch(`/users/${userAdminCreated.id}`)
      .auth(token, { type: "bearer" })
      .send(userPatch)
      .expect(422)
      .expect("Content-Type", /json/);
    expect(errors).toBeInstanceOf(Object || Array);
  });
});

describe("DELETE /users/:id", () => {
  it("Response Not Found - example : /users", async () => {
    await api.delete("/users").expect(404).expect("Content-Type", /json/);
  });

  it("Response User Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { message, del },
    } = await api
      .delete("/users/100000")
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(message).toMatch(/no longer available in database/);
    expect(del).toBeFalsy();
  });

  it("A regular user should be prevented from deleting information", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: { ok, msg },
    } = await api
      .delete(`/users/${otherUserRegularCreated.id}`)
      .auth(token, { type: "bearer" })
      .expect(403)
      .expect("Content-Type", /json/);

    expect(ok).toBeFalsy();
    expect(msg).toContain("Access Forbidden");
  });

  it("User deleted successful", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { message, del },
    } = await api
      .delete(`/users/${userRegularCreated.id}`)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(message).toMatch(/deleted successfully/);
    expect(del).toBeTruthy();
  });

  
});

afterAll(() => {
  server.close();
});
