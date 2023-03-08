import { Survey } from "../entities/Survey";
import { Question } from "../entities/Question";
import { Option } from "../entities/Option";
import { UserAuthInfoRequest } from "../interfaces/request";
import { Request, Response } from "express";
import { SurveyRequestBody } from "../interfaces/question";
import { SurveyRepository } from "../repositories/survey.repository";
import { UserRepository } from "../repositories/user.repository";
import { QuestionRepository } from "../repositories/question.repository";
import { AnonymousRepository } from "../repositories/anonymous.repository";

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

    // Remove any present questions from the survey
    await QuestionRepository.delete({ survey: userSurvey! });

    // Create a new survey
    if (!surveyId) {
      userSurvey = new Survey(user!, title, description);
    }

    // Set title, description, questions
    userSurvey!.title = title;
    userSurvey!.description = description;
    userSurvey!.questions = [];
    let order: number = 1;

    for (const question of questions) {
      // Create a new question
      const quest = new Question(
        userSurvey!,
        order++,
        question.type,
        question.question
      );

      // Initialize question options
      quest.options = [];

      if (question.type === "TEXT" || question.type === "BOOLEAN") {
        // Default option for questions without user defined options
        const opt = new Option(quest, "");
        quest.options.push(opt);
      } else if (question.options)
        for (const option of question.options) {
          // Create a new option
          const opt = new Option(quest, option);
          quest.options.push(opt);
        }
      else {
        for (let i = 0; i < 2; i++) {
          const opt = new Option(quest, "");
          quest.options.push(opt);
        }
      }

      // Add question to survey
      userSurvey!.questions.push(quest);
    }

    // Save survey
    const savedSurvey = await SurveyRepository.save(userSurvey!);

    // Return survey id
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
    // Get all user created surveys
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

export const updateStatus = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { surveyId, status } = req.body;

    // Update the status of the survey
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

    // Get survey, questions and options
    const surveys = await SurveyRepository.findOne({
      relations: {
        questions: { options: true },
      },
      where: { id: surveyId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
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

    // Convert questions and options
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
      status: surveys?.status,
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

    // Check if anon alreday completed survey
    const submittedResponse = await AnonymousRepository.findOne({
      where: { ip: req.ip },
    });
    if (submittedResponse) {
      res.status(400).json({
        message: "You have already submitted a response",
      });
      return;
    }

    const surveys = await SurveyRepository.findOne({
      relations: {
        questions: { options: true },
      },
      where: { id: surveyId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
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

    // When survey is not published
    if (surveys!.status === "DRAFT") {
      res.status(400).send("Survey is not ready");
      return;
    }

    res.status(200).send(surveys);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
