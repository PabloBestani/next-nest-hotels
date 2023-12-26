import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  totalPrice: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
