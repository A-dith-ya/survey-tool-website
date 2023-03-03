import { AppDataSource } from "../data-source";
import { Survey } from "../entities/Survey";

export const SurveyRepository = AppDataSource.getRepository(Survey);
