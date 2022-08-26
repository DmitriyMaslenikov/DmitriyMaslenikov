import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'int' })
  marketId!: number;

  @Column({ type: 'int' })
  currencyId!: number;

  @Column({ type: 'float', nullable: true })
  exchangeRate!: number;
}
