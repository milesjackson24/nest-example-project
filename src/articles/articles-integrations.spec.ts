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
  const incorrectId = "d874cf10-fe44-42f1-b0d4-1da3ec10dec0";
  const targetIdArticle: CreateArticleDto = {
    title: "Test Article",
    summary: "This is a summary",
    content: "This is the article content",
    user_id: targetId,
  };
  const incompleteArticle = {
    title: "Test Article",
    summary: "This is a summary",
  }
  

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

  afterEach(async () => {
    await repo.query("DELETE from article")
  });

  describe('GET', () => {
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
    it('Status 200: invalid id returns no items', async () => {
      await repo.save([testArticle, targetIdArticle]);
      const res = await request(app.getHttpServer())
        .get(`/articles/user/${incorrectId}`)
        .expect(HttpStatus.OK);
      const data = res.body;
      console.log(data)
      expect(data).toHaveLength(0);
    });
  });
  describe('POST', () => {
    it('Status 201: posts a new article and returns it', async () => {
      const res = await request(app.getHttpServer())
        .post("/articles")
        .set("Accept", "application/json")
        .send(testArticle)
        .expect("Content-Type", /json/)
        .expect(HttpStatus.CREATED);
      const data = res.body;
      expect(data.title).toEqual(testArticle.title);
    });
    it('Status 400: incomplete data should cause a bad request', async () => {
      const res = await request(app.getHttpServer())
        .post("/articles")
        .set("Accept", "application/json")
        .send(incompleteArticle)
        .expect("Content-Type", /json/)
        .expect(HttpStatus.BAD_REQUEST);
      expect(res.text).toBe("{\"message\":\"SQLITE_CONSTRAINT: NOT NULL constraint failed: article.content\"}");
    });
  });
  describe('PATCH', () => {

  });
  describe('DELETE', () => {
    it('Status 200: deletes an article', async () => {
      await repo.save([testArticle]);
      const article = await request(app.getHttpServer())
        .get("/articles")
        .expect(HttpStatus.OK);
      const data = article.body;
      expect(data).toHaveLength(1);
      const id = data[0].id;
      await request(app.getHttpServer())
        .delete(`/articles/${id}`)
        .expect(HttpStatus.OK);
      const newArticle = await request(app.getHttpServer())
        .get("/articles")
        .expect(HttpStatus.OK);
      const newData = newArticle.body;
      expect(newData).toHaveLength(0);
    });
    it('Status 200: invalid id does not delete', async () => {
      await repo.save([testArticle]);
      await request(app.getHttpServer())
        .delete(`/articles/${incorrectId}`)
        .expect(HttpStatus.OK);
      const res = await request(app.getHttpServer())
        .get("/articles")
        .expect(HttpStatus.OK)
      const data = res.body;
      expect(data).toHaveLength(1);
    });
  });
});
