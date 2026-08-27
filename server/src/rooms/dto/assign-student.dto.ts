import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignStudentDto {
  @ApiProperty({
    example: '1',
    description: 'Student ID',
  })
  @IsInt()
  @IsPositive()
  studentID!: number;
}
