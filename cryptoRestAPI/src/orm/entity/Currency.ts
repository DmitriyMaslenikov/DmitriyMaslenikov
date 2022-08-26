import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 20,
  })
  name!: string;

  @Column({
    length: 6,
  })
  symbol!: string;
}
