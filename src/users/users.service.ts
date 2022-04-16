import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(
      createUserDto
    );
    await this.repo.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.repo.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.repo.update(id, updateUserDto);
    return await this.repo.findOne(id);
  }

  remove(id: string) {
    this.repo.delete({ id });
    return null;
  }
}
