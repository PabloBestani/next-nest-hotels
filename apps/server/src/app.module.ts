import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { RoomTypeModule } from './room-type/room-type.module';

@Module({
  imports: [UsersModule, HotelsModule, ReservationsModule, AuthModule, RoomTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
