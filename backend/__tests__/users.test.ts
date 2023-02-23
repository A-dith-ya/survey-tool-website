import app from "../src/app";
import request from "supertest";
import { AppDataSource } from "../src/data-source";
import { UserRepository } from "../src/repositories/user.repository";

beforeAll(async () => {
  await AppDataSource.initialize();
});

describe("CRUD on User", function () {
  let token: string = "";
  const payload = {
    email: "testuser@example.com",
    username: "Test User",
    password: "password123",
  };
  it("creates User", async () => {
    const res = await request(app).post("/users").send(payload).expect(201);

    const createdUser = await UserRepository.findOne({
      select: {
        email: true,
        username: true,
      },
      where: { email: payload.email },
    });
    expect(createdUser).toMatchObject({
      email: payload.email,
      username: payload.username,
    });
    expect(res.body.token).toBeDefined();
    token = await res.body.token;
  });

  it("gets User", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toMatchObject({
      email: payload.email,
      username: payload.username,
    });
  });

  it("login/logout User", async () => {
    const res = await request(app)
      .post("/users/login")
      .send(payload)
      .expect(200);

    expect(res.body.token).toBeDefined();
    const token = res.body.token;

    await request(app)
      .delete("/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("delete User", async () => {
    await request(app)
      .delete("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const deletedUser = await UserRepository.findOne({
      where: { email: payload.email },
    });
    expect(deletedUser).toBeNull();
  });
});
