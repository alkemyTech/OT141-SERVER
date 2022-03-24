/* eslint-disable */
const supertest = require("supertest");
const app = require("../../app");

const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

const db = require("../../models");
const { ROLE_ADMIN, ROLE_USER } = require("../../constants/user.constants");
const { createUser, createMember } = require("../members.test.helpers");

// Users Login
const USER_REGULAR = { email: "userTest1@test.com", password: "user1" };
const USER_ADMIN = { email: "adminTest1@test.com", password: "admin1" };
// Users
const userRegular = {
  firstName: "user",
  lastName: "test",
  roleId: ROLE_USER,
  ...USER_REGULAR,
};
const userAdmin = {
  firstName: "admin",
  lastName: "test",
  roleId: ROLE_ADMIN,
  ...USER_ADMIN,
};
// Categories Info
const membersToCreate = [
  {
    name: "memberTest1",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
  },
  {
    name: "memberTest2",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
  },
  {
    name: "memberTest3",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
  },
];
let memberOneCreated;
beforeAll(async () => {
  try {
    await db.User.destroy({
      truncate: true,
    });
    await createUser(userAdmin);
    await createUser(userRegular);
  } catch (error) {
    console.log(error);
  }
});

beforeEach(async () => {
  try {
    await db.Member.destroy({
      truncate: true,
    });

    memberOneCreated = await createMember(membersToCreate[0]);
    await createMember(membersToCreate[1]);
    await createMember(membersToCreate[2]);
  } catch (error) {
    console.log(error);
  }
});

describe("GET /members", () => {
  it("Response Not Found - example: /member", async () => {
    await api.get("/member").expect(404).expect("Content-Type", /json/);
  });

  it("It should return that the token is required", async () => {
    const {
      body: { error },
    } = await api.get("/members").expect(403).expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const {
      body: { error },
    } = await api
      .get("/members")
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("It should return that the user does not have permission for this resource", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: {
        errors: { msg },
      },
    } = await api
      .get("/members")
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("It should return a successful response with all members", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { results },
    } = await api
      .get("/members")
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(results).toHaveLength(membersToCreate.length);
  });
});

describe("POST /members", () => {
  it("Response Not Found - example: /api/members", async () => {
    await api.post("/api/members").expect(404).expect("Content-Type", /json/);
  });

  it("It should return that the token is required", async () => {
    const {
      body: { error },
    } = await api
      .post("/members")
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const {
      body: { error },
    } = await api
      .post("/members")
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("It should return that the user does not have permission for this resource", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: {
        errors: { msg },
      },
    } = await api
      .post("/members")
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("It should return 422 when validations fail", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);
    const member = {
      name: "",
      image:"default.png"
    };
    await api
      .post("/members")
      .auth(token, { type: "bearer" })
      .send(member)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("It should return a successful response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const member = {
      name: "memberTest4",
      image:
        "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
    };

    const {
      body: { ok },
    } = await api
      .post("/members")
      .send(member)
      .auth(token, { type: "bearer" })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(ok).toBeTruthy();
  });
});

describe("PUT /categories/:id", () => {
  it("Response Not Found - example: /member/2", async () => {
    await api.put("/member/2").expect(404).expect("Content-Type", /json/);
  });

  it("It should return that the token is required", async () => {
    const {
      body: { error },
    } = await api
      .put(`/members/${memberOneCreated.id}`)
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const {
      body: { error },
    } = await api
      .put(`/members/${memberOneCreated.id}`)
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("It should return that the user does not have permission for this resource", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const memberToUpdate = {
      name: "memberTestOne",
      image:
        "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
    };
    const {
      body: {
        errors: { msg },
      },
    } = await api
      .put(`/members/${memberOneCreated.id}`)
      .send(memberToUpdate)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("Response member Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const memberToUpdate = {
      name: "memberTestOne",
      description: "memberDescriptionOne",
    };

    const {
      body: { ok },
    } = await api
      .put("/members/100000")
      .auth(token, { type: "bearer" })
      .send(memberToUpdate)
      .expect(404)
      .expect("Content-Type", /json/);
    expect(ok).toBeFalsy();
  });

  it("It should return 422 when validations fail", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const memberToUpdate = {
      name: 123,
      image: "default2.png",
    };

    await api
      .put(`/members/${memberOneCreated.id}`)
      .send(memberToUpdate)
      .auth(token, { type: "bearer" })
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("It should return a successful response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const memberToUpdate = {
      name: "memberTestOne",
      image: "https://s3.sa-east-1.amazonaws.com/ong.somos.mas/bgimg.jpg",
    };

    const {
      body: { ok },
    } = await api
      .put(`/members/${memberOneCreated.id}`)
      .send(memberToUpdate)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(ok).toBeTruthy();
  });
});

describe("DELETE /members/:id", () => {
  it("Response Not Found - example: /member/2", async () => {
    await api.delete("/member/2").expect(404).expect("Content-Type", /json/);
  });

  it("It should return that the token is required", async () => {
    const {
      body: { error },
    } = await api
      .delete(`/members/${memberOneCreated.id}`)
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const {
      body: { error },
    } = await api
      .delete(`/members/${memberOneCreated.id}`)
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("It should return that the user does not have permission for this resource", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);
    const memberToDelete = memberOneCreated;
    const {
      body: {
        errors: { msg },
      },
    } = await api
      .delete(`/members/${memberToDelete.id}`)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("Response member Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { del },
    } = await api
      .delete("/members/100000")
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(del).toBeFalsy();
  });

  it("It should return a successful response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const memberToDelete = memberOneCreated;

    const {
      body: { del },
    } = await api
      .delete(`/members/${memberToDelete.id}`)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(del).toBeTruthy();
  });
});

afterAll(() => {
  server.close();
});