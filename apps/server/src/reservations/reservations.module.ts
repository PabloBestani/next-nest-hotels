import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { HotelsModule } from 'src/hotels/hotels.module';
import { RoomTypeModule } from 'src/room-type/room-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    HotelsModule,
    RoomTypeModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
