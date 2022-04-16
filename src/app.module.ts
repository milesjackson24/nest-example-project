import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicTestServiceModule } from './basic-test-service/basic-test-service.module';
import { SourcesModule } from './sources/sources.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BasicTestServiceModule,
    SourcesModule,
    UsersModule,
    ArticlesModule,
  ],
})
export class AppModule {}
