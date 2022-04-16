import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicTestServiceModule } from './basic-test-service/basic-test-service.module';
import { SourcesModule } from './sources/sources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BasicTestServiceModule,
    SourcesModule,
  ],
})
export class AppModule {}
