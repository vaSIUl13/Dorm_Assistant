import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDormitoryDto } from './dto/create-dormitory.dto';

@Injectable()
export class DormitoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createDormitory(dto: CreateDormitoryDto) {
    const existingDormitory = await this.prisma.dormitory.findFirst({
      where: { dormNumber: dto.dormNumber },
    });

    if (existingDormitory) {
      throw new ConflictException(
        `Dormitory with number ${dto.dormNumber} already exists`,
      );
    }

    return this.prisma.dormitory.create({
      data: {
        dormNumber: dto.dormNumber,
        address: dto.address,
        capacity: dto.capacity,
      },
    });
  }

  async findAllDormitories() {
    return this.prisma.dormitory.findMany({
      include: {
        rooms: {
          select: {
            id: true,
            floor: true,
            roomNumber: true,
            capacity: true,
            _count: {
              select: {
                users: true,
              },
            },
          },
        },
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        dormNumber: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const dormitory = await this.prisma.dormitory.findUnique({
      where: { id },
      include: {
        rooms: {
          include: {
            users: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with id ${id} not found`);
    }

    return dormitory;
  }
}
