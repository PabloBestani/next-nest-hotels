import { Reservation } from 'src/reservations/entities/reservation.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('int')
  stars: number;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.hotel)
  reservations: Reservation[];

  @OneToMany(() => RoomType, (roomType) => roomType.hotel)
  roomTypes: RoomType[];
}
