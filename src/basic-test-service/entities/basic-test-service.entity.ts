import { ApiProperty } from "@nestjs/swagger";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasicTestService {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: "d8e66c00-430a-458b-ad8e-3ce56559486d" })
  id: string;

  @Column()
  @ApiProperty({ example: "miles" })
  name: string;

}
