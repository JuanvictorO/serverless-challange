import { v4 as uuidV4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('office')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
