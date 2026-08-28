import { Body, Controller, Get, Post, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { UserRoleType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DormitoriesService } from './dormitories.service';
import { CreateDormitoryDto } from './dto/create-dormitory.dto';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dormitories')
export class DormitoriesController {
  constructor(private readonly dormitoriesService: DormitoriesService) {}

  @Post()
  @Roles(UserRoleType.ADMIN)
  @ApiOperation({ summary: 'Create new dormitory' })
  async createDormitory(@Body() dto: CreateDormitoryDto) {
    return this.dormitoriesService.createDormitory(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dormitories' })
  async findAllDormitories() {
    return this.dormitoriesService.findAllDormitories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dormitory by id' })
  async findOneDormitory(@Param('id', ParseIntPipe) id: number) {
    return this.dormitoriesService.findOne(id);
  }
}
