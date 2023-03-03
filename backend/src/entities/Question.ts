import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Survey } from "./Survey";
import { Option } from "./Option";

export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE = "MULTIPLE",
  BOOLEAN = "BOOLEAN",
  DROPDOWN = "DROPDOWN",
  CHECKBOX = "CHECKBOX",
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
  question: string;

  @Column({
    default: false,
  })
  required: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: "CASCADE",
  })
  survey: Survey;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];

  constructor(
    survey: Survey,
    order: number,
    type: QuestionType,
    question: string
  ) {
    this.survey = survey;
    this.order = order;
    this.type = type;
    this.question = question;
  }
}
