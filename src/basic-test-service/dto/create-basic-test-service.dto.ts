import { ApiProperty } from "@nestjs/swagger";

export class CreateBasicTestServiceDto {
  @ApiProperty({ example: "miles" })
  name: string;
}
