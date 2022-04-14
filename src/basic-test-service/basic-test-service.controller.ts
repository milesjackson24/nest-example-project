import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicTestServiceService } from './basic-test-service.service';
import { CreateBasicTestServiceDto } from './dto/create-basic-test-service.dto';

@ApiTags("Basic Test Service")
@Controller('basic-test-service')
export class BasicTestServiceController {
  constructor(private readonly basicTestServiceService: BasicTestServiceService) {}

  @Post()
  create(@Body() createBasicTestServiceDto: CreateBasicTestServiceDto) {
    return this.basicTestServiceService.create(createBasicTestServiceDto);
  }

  @Get()
  findAll() {
    return this.basicTestServiceService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.basicTestServiceService.findOne(id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicTestServiceService.remove(id);
  }
}
