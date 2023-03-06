import { AppDataSource } from "../data-source";
import { Anonymous } from "../entities/Anonymous";

export const AnonymousRepository = AppDataSource.getRepository(Anonymous);
