import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AssignStudentDto } from './dto/assign-student.dto';

@Injectable()
export class RoomsService {
    constructor(private readonly prisma: PrismaService){}

    async createRoom(dto: CreateRoomDto) {
        const existinRroom = await this.prisma.room.findFirst({
           where: { roomNumber: dto.roomNumber, dormitoryId: dto.dormitoryId,  }
        });

        if (existinRroom) {
            throw new ConflictException(`Room with number ${dto.roomNumber} already exists`);
        }

        return this.prisma.room.create({
            data: {
                roomNumber: dto.roomNumber,
                floor: dto.floor,
                capacity: dto.capacity,
                dormitoryId: dto.dormitoryId,
            }
        })
    }

    async findAllRoms() {
        return this.prisma.room.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                _count: {
                    select: { users: true },
                },
            },
            orderBy: { roomNumber: 'asc' }
        });
    }

    async findUnique(id: number) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        if(!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }

        return room;
    }

    async assignStudents(id: number, dto:AssignStudentDto) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });

        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }

        if (room.users.length >= room.capacity) {
            throw new BadRequestException('Room doesn`t have free places');
        }

        const student = await this.prisma.user.findUnique({
            where: { id: dto.studentID }
        });

        if (!student) {
            throw new NotFoundException(`Student with id ${dto.studentID} not found`);
        }

        return this.prisma.user.update({
            where: { id: dto.studentID },
            data: { roomId: room.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        })
    }
}
