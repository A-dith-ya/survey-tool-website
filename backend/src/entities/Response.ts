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

  @ManyToOne(() => Option, (option) => option.response)
  options: Option;

  @OneToMany(() => Anonymous, (anonymous) => anonymous.response)
  anonymouses: Anonymous[];
}
