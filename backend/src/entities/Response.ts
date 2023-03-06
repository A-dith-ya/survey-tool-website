import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Anonymous } from "./Anonymous";
import { Option } from "./Option";

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  text: string;

  @Column({
    nullable: true,
  })
  numeric: number;

  @ManyToOne(() => Option, (option) => option.response, {
    onDelete: "CASCADE",
  })
  options: Option;

  @OneToMany(() => Anonymous, (anonymous) => anonymous.response, {
    cascade: true,
  })
  anonymouses: Anonymous[];

  constructor(option: Option, text: string) {
    this.options = option;
    this.text = text;
  }
}
