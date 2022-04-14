import { Test, TestingModule } from '@nestjs/testing';
import { BasicTestServiceService } from './basic-test-service.service';

describe('BasicTestServiceService', () => {
  let service: BasicTestServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicTestServiceService],
    }).compile();

    service = module.get<BasicTestServiceService>(BasicTestServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
