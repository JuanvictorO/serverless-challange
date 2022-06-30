import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('office')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
