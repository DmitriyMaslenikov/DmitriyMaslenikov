import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 20,
  })
  name!: string;
}
