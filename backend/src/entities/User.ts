import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Length, IsEmail, MinLength } from "class-validator";
import { Survey } from "./Survey";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[];
}
