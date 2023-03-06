import { AppDataSource } from "../data-source";
import { Response } from "../entities/Response";

export const ResponseRepository = AppDataSource.getRepository(Response);
