import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { HotelsModule } from 'src/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType]), HotelsModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
