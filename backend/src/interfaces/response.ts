import { QuestionType } from "../entities/Question";

interface Response {
  type: QuestionType;
  optionId: number;
  text: string;
}

export interface SurveyResponseBody {
  ip: string;
  responses: Response[];
}
