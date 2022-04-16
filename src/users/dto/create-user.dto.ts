import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Tim" })
  name: string

  @ApiProperty({ example: 5 })
  years_experience: number

  @ApiProperty({ example: "reporter" })
  profession: string
}
