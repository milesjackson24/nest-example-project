import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source } from './entities/source.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private repo: Repository<Source>
  ) {}

  async create(CreateSourceDto: CreateSourceDto) {
    const source = this.repo.create(
      CreateSourceDto
    );
    await this.repo.save(source);
    return source;
  }

  async findAll(): Promise<Source[]> {
    return await this.repo.find();
  }

  // async findOne(id: string): Promise<Source> {
  //   return await this.repo.findOne({ id });
  // }

  // update(id: number, updateSourceDto: UpdateSourceDto) {
  //   return `This action updates a #${id} source`;
  // }

  remove(id: string): Promise<void> {
    this.repo.delete(id);
    return null;
  }
}
