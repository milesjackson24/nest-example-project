import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { ArticlesModule } from './articles.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateArticleDto } from './dto/create-article.dto';

describe('ArticlesController', () => {
  let service: ArticlesService;
  let repo: Repository<Article>;
  let app: INestApplication;

  const testArticle: CreateArticleDto = {
    title: "Test Article",
    summary: "This is a summary",
    content: "This is the article content",
    user_id: "b794cf10-fe44-42f1-b0d4-1da3ec10df20",
  };
  const targetId = "b794cf10-fe44-42f1-b0d4-1da3ec10dec4";
  const targetIdArticle: CreateArticleDto = {
    title: "Test Article",
    summary: "This is a summary",
    content: "This is the article content",
    user_id: targetId,
  };
  

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ArticlesModule,
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [Article],
          logging: true,
          synchronize: true,
        })
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get<ArticlesService>(ArticlesService);
    repo = getRepository(Article);
  });

  afterAll(async () => {
    await app.close();
  });

  it('Status 200: should return all articles', async () => {
    await repo.save([testArticle, testArticle]);
    const res = await request(app.getHttpServer())
      .get("/articles")
      .expect(HttpStatus.OK);
    const data = res.body;
    expect(data).toHaveLength(2);
  });
  it('Status 200: should return only articles with user id', async () => {
    await repo.save([testArticle, targetIdArticle]);
    const res = await request(app.getHttpServer())
      .get(`/articles/user/${targetId}`)
      .expect(HttpStatus.OK);
    const data = res.body;
    expect(data).toHaveLength(1);
    expect(data[0].user_id).toBe(targetId);
  });
  
});
