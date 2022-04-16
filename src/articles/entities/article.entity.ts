import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "1ce8e490-f64f-4d3c-9e1f-074b356f55e0" })
  id: string

  @Column()
  @ApiProperty({ example: "article 1" })
  title: string

  @Column()
  @ApiProperty({ example: "This is an article about..." })
  summary: string
  
  @Column({ length: 10000 })
  @ApiProperty({ example: "Content" })
  content: string

  @Column()
  @ApiProperty({ example: "1ce8e490-f64f-4d3c-9e1f-074b356f55f9" })
  user_id: string

}
