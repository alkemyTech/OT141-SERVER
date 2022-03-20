/* eslint-disable */
const supertest = require("supertest");
const app = require("../../app");

const server = app.listen(process.env.PORT_TEST);
const api = supertest(app);

const db = require('../../models');

const { ROLE_ADMIN, ROLE_USER } = require("../../constants/user.constants");
const { createUser, createCategory } = require("../categories.test.helpers");

// Users Login
const USER_REGULAR = { email: "user1@test.com", password: "user1" };
const USER_ADMIN = { email: "admin1@test.com", password: "admin1" };

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
const categoriesToCreate = [
  {
    name: "categoryTest1",
    description: "categoryDescription1",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "categoryTest2",
    description: "categoryDescription2",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "categoryTest3",
    description: "categoryDescription3",
    image:
      "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
let categoryOneCreated;

beforeEach(async () => {
  await db.User.destroy({
    truncate: true,
  });
 await db.Category.destroy({
    truncate: true,
  }); 
  categoryOneCreated = await createCategory(categoriesToCreate[0]);
  await createCategory(categoriesToCreate[1]);
  await createUser(userAdmin);
  await createUser(userRegular);
});

describe("GET /categories", () => {
  it("Response Not Found - example: /category", async () => {
    await api
      .get("/category")
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return that the token is required", async () => {
    const { body:{error} } = await api
      .get("/categories")
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const { body:{error} } = await api
      .get("/categories")
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("It should return a successful response with all categories", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { results, next, prev },
    } = await api
      .get("/categories")
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(results).toHaveLength(categories.length);
    expect(next).toContain("page=2");
    expect(prev).toContain(null);
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
      .get("/categories")
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });
});

describe("GET /categories/:id", () => {
  it("Response Not Found - example: /category/2", async () => {
    await api
      .get("/category/2")
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return that the token is required", async () => {
    const { body:{error} } = await api
      .get("/categories")
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const { body:{error} } = await api
      .get("/categories")
      .auth("Bearer send token invalid", { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(error).toContain("Invalid Token");
  });

  it("Response category Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { msg, ok },
    } = await api
      .get("/categories/100000")
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(msg).toContain("The category does not exist");
    expect(ok).toBeFalsy();
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
      .get(`/categories/${categoryOneCreated.id}`)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("It should return success response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_REGULAR);

    const {
      body: {
        errors: { message, data },
      },
    } = await api
      .get(`/categories/${categoryOneCreated.id}`)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(message).toContain("Category found");
    expect(data.name).toBe(categoryOneCreated.name);
  });
});

describe("POST /categories", () => {
  it("Response Not Found - example: /api/categories", async () => {
    await api
      .post("/api/categories")
      .send(categoriesToCreate[2])
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return that the token is required", async () => {
    const { body:{error} } = await api
      .post("/categories")
      .send(categoriesToCreate[2])
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const { body:{error} } = await api
      .post("/categories")
      .auth("Bearer send token invalid", { type: "bearer" })
      .send(categoriesToCreate[2])
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
      .post("/categories")
      .auth(token, { type: "bearer" })
      .send(categoriesToCreate[2])
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("It should return 422 when validations fail", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);
    const category = {
      name: "",
    };
    await api
      .post("/categories")
      .send(category)
      .auth(token, { type: "bearer" })
      .expect(422)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return a successful response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { ok },
    } = await api
      .post("/categories")
      .send(categoriesToCreate[2])
      .auth(token, { type: "bearer" })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(ok).toBeTruthy();
  });
});

describe("PUT /categories/:id", () => {
  it("Response Not Found - example: /category/2", async () => {
    await api
      .put("/category/2")
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return that the token is required", async () => {
    const { body:{error} } = await api
      .put(`/categories/${categoryOneCreated.id}`)
      .expect(403)
      .expect("Content-Type", /json/);
    expect(error).toContain("A token is required for authentication");
  });

  it("It should return that the token is invalid", async () => {
    const { body:{error} } = await api
      .put(`/categories/${categoryOneCreated.id}`)
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
      .put(`/categories/${categoryOneCreated.id}`)
      .send(categoryUpdate)
      .auth(token, { type: "bearer" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(msg).toContain("You do not have permissions for this resource");
  });

  it("Response category Not Found", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const {
      body: { message },
    } = await api
      .put("/categories/100000")
      .auth(token, { type: "bearer" })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(message).toContain("Category not found");
  });

  it("It should return 422 when validations fail", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const category = {
      name: 123,
      description: 1234,
      image: "default.png",
    };

    await api
      .put(`/categories/${categoryOneCreated.id}`)
      .send(category)
      .auth(token, { type: "bearer" })
      .expect(422)
      .expect("Content-Type", /application\/json/);
  });

  it("It should return a successful response", async () => {
    const {
      body: { token },
    } = await api.post("/auth/login").send(USER_ADMIN);

    const categoryToUpdate = {
      name: "categoryTestOne",
      description: "categoryDescriptionOne",
    };

    const {
      body: { message, category },
    } = await api
      .put(`/categories/${categoryOneCreated.id}`)
      .send(categoryToUpdate)
      .auth(token, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(category.name).toBe(categoryToUpdate.name);
    expect(message).toContain("Category updated");
  });
});

describe("DELETE /categories/:id", () => {
    it("Response Not Found - example: /category/2", async () => {
        await api
          .delete("/category/2")
          .expect(404)
          .expect("Content-Type", /application\/json/);
      });
    
      it("It should return that the token is required", async () => {
        const { body:{error} } = await api
          .delete(`/categories/${categoryOneCreated.id}`)
          .expect(403)
          .expect("Content-Type", /json/);
        expect(error).toContain("A token is required for authentication");
      });
    
      it("It should return that the token is invalid", async () => {
        const { body:error } = await api
          .delete(`/categories/${categoryOneCreated.id}`)
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
          .delete(`/categories/${categoryOneCreated.id}`)
          .send(categoryUpdate)
          .auth(token, { type: "bearer" })
          .expect(401)
          .expect("Content-Type", /application\/json/);
        expect(msg).toContain("You do not have permissions for this resource");
      });

      it("Response category Not Found", async () => {
        const {
          body: { token },
        } = await api.post("/auth/login").send(USER_ADMIN);
    
        const {
          body: { del },
        } = await api
          .delete("/categories/100000")
          .auth(token, { type: "bearer" })
          .expect(404)
          .expect("Content-Type", /json/);
        expect(del).toBeFalsy();
      });

      it("It should return a successful response", async () => {
        const {
          body: { token },
        } = await api.post("/auth/login").send(USER_ADMIN);
    
        const categoryToDelete = categoryOneCreated;

        const {
          body: { del },
        } = await api
          .delete(`/categories/${categoryToDelete.id}`)
          .auth(token, { type: "bearer" })
          .expect(200)
          .expect("Content-Type", /application\/json/);
          expect(del).toBeTruthy()
      });
  });

afterAll(() => {
  server.close();
});
