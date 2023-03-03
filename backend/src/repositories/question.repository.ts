import { AppDataSource } from "../data-source";
import { Question } from "../entities/Question";

export const QuestionRepository = AppDataSource.getRepository(Question);
