import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

enum SurveyStatus {
  DRAFT = "DRAFT",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: 1,
  })
  pages: number;

  @Column({
    type: "enum",
    enum: SurveyStatus,
    default: SurveyStatus.DRAFT,
  })
  status: SurveyStatus;

  @CreateDateColumn()
  createdDate: Date;

  @Column({
    nullable: true,
  })
  deadline_time: string;

  @ManyToOne(() => User, (user) => user.surveys)
  user: User;

  @OneToMany(() => Question, (question) => question.survey, { cascade: true })
  questions: Question[];
}
