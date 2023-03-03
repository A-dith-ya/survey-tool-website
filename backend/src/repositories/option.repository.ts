import { AppDataSource } from "../data-source";
import { Option } from "../entities/Option";

export const OptionRepository = AppDataSource.getRepository(Option);
