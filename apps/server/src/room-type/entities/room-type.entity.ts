import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  cost: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.id)
  reservations: Reservation[];

  @ManyToOne(() => Hotel, (hotel) => hotel.id)
  hotel: Hotel;
}
