import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { HotelsModule } from 'src/hotels/hotels.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType]), HotelsModule, AuthModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
