import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "763b4e63-5969-419b-a954-75f0d2bb9890" })
  id: string

  @Column()
  @ApiProperty({ example: "Tim" })
  name: string

  @Column()
  @ApiProperty({ example: 5 })
  years_experience: number

  @Column()
  @ApiProperty({ example: "reporter" })
  profession: string

}
