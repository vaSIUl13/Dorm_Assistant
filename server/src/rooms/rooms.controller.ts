import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { UserRoleType } from '@prisma/client';
import { AssignStudentDto } from './dto/assign-student.dto';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Roles(UserRoleType.COMMANDANT)
  @ApiOperation({ summary: 'Create a new room' })
  async createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  async findAllRooms() {
    return this.roomsService.findAllRoms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get data about a specific room' })
  async findOneRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findUnique(id);
  }

  @Post(':id/assign-student')
  @Roles(UserRoleType.COMMANDANT)
  @ApiOperation({ summary: 'Assign a student to the room' })
  async assignStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignStudentDto,
  ) {
    return this.roomsService.assignStudents(id, dto);
  }
}
