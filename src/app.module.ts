import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicTestServiceModule } from './basic-test-service/basic-test-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BasicTestServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
