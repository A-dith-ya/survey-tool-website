import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length, IsEmail, MinLength } from "class-validator";

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
}
