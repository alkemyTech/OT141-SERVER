/* eslint-disable */
const supertest = require("supertest");
const app = require("../../app");
const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

describe("GET /users", () => {
  it("Response Not Fount", async () => {
    await api.get("/user").send().expect(404);
  });

  it("Response successfully", async () => {
    const resLog = await api
    .post("/auth/login")
    .send({
      email: "admin1@test.com",
      password: "admin1"
    });
console.log(resLog.body)
    const resUser = await api
      .get("/users")
      .set("Authorization", `Bearer ${resLog.body.token}`)
    expect(resUser.statusCode).toBe(200);
  });
});

afterAll(() => {
  server.close();
});
