import app from "../src/app";
import request from "supertest";
import { AppDataSource } from "../src/data-source";
import { SurveyRepository } from "../src/repositories/survey.repository";

const surveyCreator = {
  email: "testuser2@example.com",
  username: "Test User2",
  password: "password123",
};
let token: string = "";

beforeAll(async () => {
  await AppDataSource.initialize();

  const res = await request(app).post("/users").send(surveyCreator);
  token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
});

describe("CRUD on Survey", function () {
  let surveyId = -1;
  const survey = {
    title: "Customer Survey",
    description: "Determine present customers satisfaction with our services.",
    questions: [
      {
        question: "Question 12",
        options: ["Option 1", "Option 2"],
        type: "MULTIPLE",
      },
      { question: "Question 2", type: "TEXT" },
      {
        question: "Question 3",
        options: ["Option 3", "Option 4"],
        type: "DROPDOWN",
      },
      {
        question: "Question 4",
        options: ["Option 5", "Option 6"],
        type: "CHECKBOX",
      },
      { question: "Question 5", type: "BOOLEAN" },
    ],
  };

  it("should create a new survey", async () => {
    const res = await request(app)
      .post("/surveys")
      .set("Cookie", `token=${token}`)
      .send(survey);

    const createdSurvey = await SurveyRepository.findOne({
      where: { title: survey.title },
    });

    expect(createdSurvey).toBeDefined();
    expect(res.status).toBe(200);

    surveyId = createdSurvey!.id;
  });

  it("should get all surveys", async () => {
    const res = await request(app)
      .get("/surveys")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
  });

  it("should delete a survey", async () => {
    const res = await request(app)
      .delete("/surveys")
      .set("Cookie", `token=${token}`)
      .send({ surveyId });

    const createdSurvey = await SurveyRepository.findOne({
      where: { title: survey.title },
    });

    expect(res.status).toBe(200);
    expect(createdSurvey).toBeNull();
  });
});

afterAll(async () => {
  await request(app)
    .delete("/users")
    .set("Cookie", `token=${token}`)
    .expect(200);
});
