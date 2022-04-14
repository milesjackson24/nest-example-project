import { Module } from '@nestjs/common';
import { BasicTestServiceService } from './basic-test-service.service';
import { BasicTestServiceController } from './basic-test-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicTestService } from './entities/basic-test-service.entity';


@Module({
  imports: [TypeOrmModule.forFeature([BasicTestService])],
  controllers: [BasicTestServiceController],
  providers: [BasicTestServiceService]
})
export class BasicTestServiceModule {}
