import { Response } from "express";
import { Anonymous } from "../entities/Anonymous";
import { UserAuthInfoRequest } from "../interfaces/request";
import { Response as EntityResponse } from "../entities/Response";
import { ResponseRepository } from "../repositories/response.repository";
import { AnonymousRepository } from "../repositories/anonymous.repository";
import { OptionRepository } from "../repositories/option.repository";
import { SurveyRepository } from "../repositories/survey.repository";

export const createResponse = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { responses } = req.body;

    const submittedResponse = await AnonymousRepository.findOne({
      where: { ip: req.ip },
    });
    if (submittedResponse) {
      res.status(400).json({
        message: "You have already submitted a response",
      });
      return;
    }

    // New anon response
    const newIp = new Anonymous(req.ip);

    // Create new set of responses
    for (const response of responses) {
      const option = await OptionRepository.findOne({
        where: { id: response.optionId },
      });
      const newResponse = new EntityResponse(option!, response.text);

      newResponse.anonymouses = [newIp];
      await ResponseRepository.save(newResponse);
    }

    res.status(201).json({ message: "Response added" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const getResponses = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const surveyId = parseInt(req.params.surveyId);

    const surveys = await SurveyRepository.findOne({
      relations: {
        questions: {
          options: {
            response: true,
          },
        },
      },
      where: { id: surveyId },
      select: {
        id: true,
        title: true,
        questions: {
          id: true,
          order: true,
          type: true,
          question: true,
          options: {
            id: true,
            value: true,
            response: {
              id: true,
              text: true,
            },
          },
        },
      },
    });

    // Convert results to displayable format
    const convertedSurvey = surveys?.questions.map((question) => {
      switch (question.type) {
        case "DROPDOWN":
        case "CHECKBOX":
        case "MULTIPLE":
          return {
            question: question.question,
            order: question.order,
            type: question.type,
            options: question.options.map((option) => ({
              value: option.value,
              number: option.response.length,
            })),
          };
        case "BOOLEAN":
          return {
            question: question.question,
            order: question.order,
            type: question.type,
            trueNumber: question.options.map(
              (option) =>
                option.response.filter((res) => res.text === "true").length
            ),
            falseNumber: question.options.map(
              (option) =>
                option.response.filter((res) => res.text === "false").length
            ),
          };
        case "TEXT":
          return {
            question: question.question,
            order: question.order,
            type: question.type,
            options: question.options.map((option) =>
              option.response.map((res) => res.text)
            ),
          };
      }
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
