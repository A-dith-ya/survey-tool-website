import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Response } from "./Response";

@Entity()
export class Anonymous {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column({
    default: false,
  })
  completion: boolean;

  @ManyToOne(() => Response, (response) => response.anonymouses, {
    onDelete: "CASCADE",
  })
  response: Response;

  constructor(ip: string) {
    this.ip = ip;
    this.completion = true;
  }
}
