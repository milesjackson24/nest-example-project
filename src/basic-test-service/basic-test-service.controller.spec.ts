import { Test, TestingModule } from '@nestjs/testing';
import { BasicTestServiceController } from './basic-test-service.controller';
import { BasicTestServiceService } from './basic-test-service.service';

describe('BasicTestServiceController', () => {
  let controller: BasicTestServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicTestServiceController],
      providers: [BasicTestServiceService],
    }).compile();

    controller = module.get<BasicTestServiceController>(BasicTestServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
