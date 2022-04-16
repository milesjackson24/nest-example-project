import { ApiProperty } from "@nestjs/swagger";

export class CreateSourceDto {
  @ApiProperty({ example: "https://bbc.co.uk/news" })
  source_url: string;

  @ApiProperty({ example: "BBC News" })
  source_name: string;
}
