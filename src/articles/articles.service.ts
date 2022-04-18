import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private repo: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.repo.create(createArticleDto);
    await this.repo.save(article);
    return article;
  }

  async findAll(): Promise<Article[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<Article> {
    return this.repo.findOne({ id });
  }

  async findByUserId(user_id: string): Promise<Article[]> {
    return this.repo.find({ user_id });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    await this.repo.update(id, updateArticleDto);
    return await this.repo.findOne({ id });
  }

  remove(id: string) {
    this.repo.delete({ id });
    return null;
  }
}
