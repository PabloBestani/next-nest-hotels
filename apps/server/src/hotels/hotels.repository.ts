import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';

export interface HotelRepository extends Repository<Hotel> {
  this: Repository<Hotel>;
  findOneWithReservationsAndUserEmail(id: string): Promise<Hotel | null>;
}

export const customHotelRepository: Pick<HotelRepository, any> = {
  findOneWithReservationsAndUserEmail(this: Repository<Hotel>, id: string) {
    return this.createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.reservations', 'reservation')
      .leftJoinAndSelect('reservation.userEmail', 'user')
      .select(['hotel', 'reservation', 'user.email'])
      .where('hotel.id = :id', { id })
      .getOne();
  },
};
