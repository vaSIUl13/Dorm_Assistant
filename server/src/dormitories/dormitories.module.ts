import { Module } from '@nestjs/common';
import { DormitoriesService } from './dormitories.service';
import { DormitoriesController } from './dormitories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DormitoriesService],
  controllers: [DormitoriesController],
  exports: [DormitoriesService],
})
export class DormitoriesModule {}
