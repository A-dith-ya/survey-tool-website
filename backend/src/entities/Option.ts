import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Question } from "./Question";
import { Response } from "./Response";

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  value: string;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: "CASCADE",
  })
  question: Question;

  @OneToMany(() => Response, (response) => response.options)
  response: Response[];

  constructor(question: Question, value: string) {
    this.question = question;
    this.value = value;
  }
}
