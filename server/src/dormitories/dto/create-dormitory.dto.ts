import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDormitoryDto {
  @ApiProperty({ example: 11, description: 'The number of the dormitory' })
  @IsInt()
  @IsPositive()
  dormNumber!: number;

  @ApiProperty({
    example: 'Lviv, Lukasha, 5',
    description: 'The address of the dormitory',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 650, description: 'The capacity of the dormitory' })
  @IsInt()
  @Min(1)
  @Max(700)
  capacity!: number;
}
