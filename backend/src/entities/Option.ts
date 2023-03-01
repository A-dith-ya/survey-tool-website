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

  @Column()
  value: string;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  @OneToMany(() => Response, (response) => response.options)
  response: Response[];
}
