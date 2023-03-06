import { Response } from "express";
import { Anonymous } from "../entities/Anonymous";
import { UserAuthInfoRequest } from "../interfaces/request";
import { Response as EntityResponse } from "../entities/Response";
import { ResponseRepository } from "../repositories/response.repository";
import { AnonymousRepository } from "../repositories/anonymous.repository";
import { SurveyResponseBody } from "../interfaces/response";
import { OptionRepository } from "../repositories/option.repository";
import { SurveyRepository } from "../repositories/survey.repository";

export const createResponse = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { ip, responses }: SurveyResponseBody = req.body;

    const submittedResponse = await AnonymousRepository.findOne({
      where: { ip },
    });
    if (submittedResponse) {
      res.status(400).json({
        message: "You have already submitted a response",
      });
      return;
    }

    const newIp = new Anonymous(ip);

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
    const { surveyId }: { surveyId: number } = req.body;

    const surveyResponses = await SurveyRepository.find({
      relations: {
        questions: {
          options: {
            response: true,
          },
        },
      },
      where: { id: surveyId },
      select: {
        title: true,
        questions: {
          order: true,
          type: true,
          question: true,
          options: {
            value: true,
            response: {
              text: true,
            },
          },
        },
      },
    });

    res.status(200).send(surveyResponses);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
