import { Survey } from "../entities/Survey";
import { Question } from "../entities/Question";
import { Option } from "../entities/Option";
import { UserAuthInfoRequest } from "../interfaces/request";
import { Response } from "express";
import { SurveyRequestBody } from "../interfaces/question";
import { SurveyRepository } from "../repositories/survey.repository";
import { UserRepository } from "../repositories/user.repository";
import { QuestionRepository } from "../repositories/question.repository";

export const createSurvey = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { surveyId, title, description, questions }: SurveyRequestBody =
      req.body;

    const user = await UserRepository.findOne({
      where: { id: req.userId },
    });

    let userSurvey = await SurveyRepository.findOne({
      where: { id: surveyId },
    });

    await QuestionRepository.delete({ survey: userSurvey! });

    if (!surveyId) {
      userSurvey = new Survey(user!, title, description);
    }
    userSurvey!.questions = [];
    let order: number = 1;
    for (const question of questions) {
      const quest = new Question(
        userSurvey!,
        order++,
        question.type,
        question.question
      );

      quest.options = [];

      if (question.options)
        for (const option of question.options) {
          const opt = new Option(quest, option);
          quest.options.push(opt);
        }

      userSurvey!.questions.push(quest);
    }

    await SurveyRepository.save(userSurvey!);

    res.status(200).send("Successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const listSurveys = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const surveys = await SurveyRepository.find({
      where: { user: { id: req.userId } },
      select: ["id", "title", "description", "createdDate", "status"],
    });

    res.status(200).send(surveys);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSurvey = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { surveyId } = req.body;
    await SurveyRepository.delete({ id: surveyId });

    res.status(200).send("Deleted Survey");
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
