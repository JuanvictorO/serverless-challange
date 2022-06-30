import { v4 as uuidV4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Office } from './Office';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  age: number;

  @Column()
  office_id: string;

  @ManyToOne(() => Office)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
