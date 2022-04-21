import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags("Articles")
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('/user/:user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.articlesService.findByUserId(user_id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    const res = await this.articlesService.update(id, updateArticleDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
    if ( res === undefined ) {
      throw new HttpException(
        {message: "Article not found"},
        HttpStatus.NOT_FOUND,
      );
    }
    else {
      return res;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
