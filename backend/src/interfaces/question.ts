import { QuestionType } from "../entities/Question";

interface Question {
  question: string;
  options?: string[];
  type: QuestionType;
}

export interface SurveyRequestBody {
  surveyId?: number;
  title: string;
  description?: string;
  questions: Question[];
}
