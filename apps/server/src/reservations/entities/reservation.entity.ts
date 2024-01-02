import { Hotel } from 'src/hotels/entities/hotel.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  totalPrice: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  userEmail: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.id)
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType) => roomType.id)
  roomType: RoomType;
}
