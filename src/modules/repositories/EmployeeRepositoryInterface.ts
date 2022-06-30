import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { IUpdateEmployeeDTO } from '@modules/dtos/IUpdateEmployeeDTO';
import { FindOneOptions } from 'typeorm';

import { Employee } from '../infra/typeorm/entities/Employee';

export interface EmployeeRepositoryInterface {
  findOne(id?: string, options?: FindOneOptions | undefined): Promise<Employee | undefined>;
  findAll(options?: FindOneOptions | undefined): Promise<Employee[]>;
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  save(data: IUpdateEmployeeDTO): Promise<Employee>;
  delete(id: string): Promise<boolean>;
}
