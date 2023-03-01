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
    const res = await request(app).post("/users").send(payload);

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
    expect(res.statusCode).toEqual(201);
    expect(res.headers["set-cookie"]).toBeDefined();
    token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  it("gets User", async () => {
    const res = await request(app)
      .get("/users")
      .set("Cookie", `token=${token}`)
      .expect(200);

    expect(res.body).toMatchObject({
      email: payload.email,
      username: payload.username,
    });
  });

  it("updates User", async () => {
    payload.email = "testuser2@example.com";
    payload.username = "Test User2";

    const res = await request(app)
      .put("/users")
      .set("Cookie", `token=${token}`)
      .send(payload);

    const updatedUser = await UserRepository.findOne({
      select: {
        email: true,
        username: true,
      },
      where: { email: payload.email },
    });
    expect(updatedUser).toMatchObject({
      email: payload.email,
      username: payload.username,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"]).toBeDefined();
    token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  it("login/logout User", async () => {
    const res = await request(app).post("/users/login").send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"]).toBeDefined();
    token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];

    const res2 = await request(app)
      .delete("/users/logout")
      .set("Cookie", `token=${token}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.headers["set-cookie"][0]).toMatch(/token=;.*/);
  });

  it("delete User", async () => {
    await request(app)
      .delete("/users")
      .set("Cookie", `token=${token}`)
      .expect(200);

    const deletedUser = await UserRepository.findOne({
      where: { email: payload.email },
    });
    expect(deletedUser).toBeNull();
  });
});
