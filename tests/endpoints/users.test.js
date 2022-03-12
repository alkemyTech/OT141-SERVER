/* eslint-disable */
const app = require("../../app");
const supertest = require("supertest");
const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

const { USER_REGULAR, USER_ADMIN } = require("../constants");

describe("GET /users", () => {
  it("Response Not Found - example: /user", async () => {
    await api.get("/user").send().expect(404);
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
    expect(users).toBeInstanceOf(Array);
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
    await api.patch("/api/users").expect(404);
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
      image: "default.png",
    };
    const {
      body: { message, user },
    } = await api
      .patch("/users/3")
      .auth(token, { type: "bearer" })
      .send(userPatch)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(message).toContain("user updated successfully");
    expect(user).toBeInstanceOf(Object);
  });

  it("A regular user should be prevented from updating information", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: { ok, msg },
    } = await api
      .patch("/users/3")
      .auth(token, { type: "bearer" })
      .expect(403)
      .expect("Content-Type", /json/);

    expect(ok).toBeFalsy();
    expect(msg).toContain("Access Forbidden");
  });

  it("You should get errors for sending numeric values", async () => {
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
      .patch("/users/3")
      .auth(token, { type: "bearer" })
      .send(userPatch)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(errors).toBeInstanceOf(Object || Array);
  });
});

describe("DELETE /users/:id", () => {
  it("Response Not Found - example : /users", async () => {
    await api.delete("/users").expect(404);
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

  it("User deleted successful", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { message, del },
    } = await api
      .delete("/users/7")
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(message).toMatch(/deleted successfully/);
    expect(del).toBeTruthy();
  });

  it("A regular user should be prevented from deleting information", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: { ok, msg },
    } = await api
      .delete("/users/8")
      .auth(token, { type: "bearer" })
      .expect(403)
      .expect("Content-Type", /json/);

    expect(ok).toBeFalsy();
    expect(msg).toContain("Access Forbidden");
  });
});

afterAll(() => {
  server.close();
});
