import {
  Column,
  DeleteDateColumn,
  Entity,
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
}
