import { Role } from 'src/common/enums/role.enum';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.id)
  reservations: Reservation[];
}
