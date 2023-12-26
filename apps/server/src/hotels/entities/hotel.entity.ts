import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

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
}
