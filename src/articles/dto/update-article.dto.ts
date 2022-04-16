import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  title?: string;
  summary?: string;
  content?: string;
  user_id?: string;
}
