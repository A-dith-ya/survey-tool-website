import { Survey } from "../entities/Survey";
import { Question } from "../entities/Question";
import { Option } from "../entities/Option";
import { UserAuthInfoRequest } from "../interfaces/request";
import { Request, Response } from "express";
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

    console.log(questions);

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

    userSurvey!.title = title;
    userSurvey!.description = description;

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
      else {
        for (let i = 0; i < 2; i++) {
          const opt = new Option(quest, "");
          quest.options.push(opt);
        }
      }

      userSurvey!.questions.push(quest);
    }

    const savedSurvey = await SurveyRepository.save(userSurvey!);

    res.status(200).send({ id: savedSurvey.id });
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

    console.log(surveys);
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

export const updateStatus = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { surveyId, status } = req.body;
    console.log(surveyId);
    await SurveyRepository.update({ id: surveyId }, { status });

    res.status(200).send("Changed survey status");
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const getSurvey = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const surveyId = parseInt(req.params.surveyId);

    const surveys = await SurveyRepository.findOne({
      relations: {
        questions: { options: true },
      },
      where: { id: surveyId },
      select: {
        id: true,
        title: true,
        description: true,
        questions: {
          id: true,
          order: true,
          type: true,
          question: true,
          options: {
            id: true,
            value: true,
          },
        },
      },
    });

    const convertedSurvey = surveys?.questions.map((question) => {
      const convertedQuestion = {
        question: question.question,
        order: question.order,
        type: question.type,
        options: question.options.map((option) => option.value),
      };

      return convertedQuestion;
    });

    res.status(200).send({
      title: surveys?.title,
      description: surveys?.description,
      questions: convertedSurvey,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const getSurveyResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const surveyId = parseInt(req.params.surveyId);

    const surveys = await SurveyRepository.findOne({
      relations: {
        questions: { options: true },
      },
      where: { id: surveyId },
      select: {
        title: true,
        description: true,
        status: true,
        questions: {
          order: true,
          type: true,
          question: true,
          options: {
            id: true,
            value: true,
          },
        },
      },
    });

    if (surveys!.status === "DRAFT") {
      res.status(400).send("Survey is not ready");
      return;
    }

    const convertedSurvey = surveys?.questions.map((question) => {
      const convertedQuestion = {
        question: question.question,
        order: question.order,
        type: question.type,
        options: question.options.map((option) => option.value),
      };

      return convertedQuestion;
    });

    res.status(200).send({
      title: surveys?.title,
      description: surveys?.description,
      questions: convertedSurvey,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
