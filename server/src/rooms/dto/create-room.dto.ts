import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsPositive,
} from 'class-validator';

export class CreateRoomDto {
  /* Room Number */
  @ApiProperty({
    example: '202A',
    description: 'Room Number',
  })
  @IsString()
  @IsNotEmpty()
  roomNumber!: string;

  /* Floor number */
  @ApiProperty({
    example: 3,
    description: 'Floor number',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  floor!: number;

  /* Capacity */
  @ApiProperty({
    example: 4,
    description: 'Capacity',
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  capacity!: number;

  /* Dormitory ID */
  @ApiProperty({
    example: 4,
    description: 'Dormitory ID',
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  dormitoryId!: number;
}
