import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Survey } from "./Survey";
import { Option } from "./Option";

enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE = "MULTIPLE",
  BOOLEAN = "BOOLEAN",
  DROPDOWN = "DROPDOWN",
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({
    type: "enum",
    enum: QuestionType,
  })
  type: string;

  @Column()
  title: string;

  @Column({
    default: false,
  })
  required: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
