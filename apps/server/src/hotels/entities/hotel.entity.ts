import { Column, PrimaryColumn } from 'typeorm';

export class Hotel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  stars: number;
}
