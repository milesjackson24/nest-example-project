import { ApiProperty } from "@nestjs/swagger"

export class CreateArticleDto {
  @ApiProperty({ example: "article 1" })
  title: string

  @ApiProperty({ example: "This is an article about..." })
  summary: string
  
  @ApiProperty({ example: "Content" })
  content: string

  @ApiProperty({ example: "1ce8e490-f64f-4d3c-9e1f-074b356f55f9" })
  user_id: string
}
