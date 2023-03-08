import { QuestionType } from "../entities/Question";

interface Response {
  optionId: number;
  text: string;
}

export interface SurveyResponseBody {
  responses: Response[];
}
