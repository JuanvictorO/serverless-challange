import { integer } from 'aws-sdk/clients/cloudfront';
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
}
