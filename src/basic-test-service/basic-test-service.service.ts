import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBasicTestServiceDto } from './dto/create-basic-test-service.dto';
import { Repository } from 'typeorm';
import { BasicTestService } from './entities/basic-test-service.entity';

@Injectable()
export class BasicTestServiceService {
  constructor(
    @InjectRepository(BasicTestService)
    private repo: Repository<BasicTestService>
  ) {}

  async create(createBasicTestServiceDto: CreateBasicTestServiceDto) {
    const basicTestService = this.repo.create(
      createBasicTestServiceDto
    );
    await this.repo.save(basicTestService);
    return basicTestService;
  }

  async findAll(): Promise<BasicTestService[]> {
    return await this.repo.find();
  }

  // async findOne(id: string): Promise<BasicTestService[]> {
  //   return await this.repo.find({ id });
  // }

  remove(id: string): Promise<void> {
    this.repo.delete(id);
    return null;
  }
}
