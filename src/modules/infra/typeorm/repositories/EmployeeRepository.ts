import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { IUpdateEmployeeDTO } from '@modules/dtos/IUpdateEmployeeDTO';
import { EmployeeRepositoryInterface } from '@modules/repositories/EmployeeRepositoryInterface';

import { FindOneOptions, getRepository, Repository } from 'typeorm';

import { Employee } from '../entities/Employee';

export class EmployeeRepository implements EmployeeRepositoryInterface {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  findAll(): Promise<Employee[]> {
    return this.ormRepository.find();
  }
  findOne(id: string, options?: FindOneOptions | undefined): Promise<Employee | undefined> {
    return this.ormRepository.findOne(id, options);
  }
  create(data: ICreateEmployeeDTO): Promise<Employee> {
    return this.ormRepository.save(data);
  }
  async save(data: IUpdateEmployeeDTO): Promise<Employee> {
    return this.ormRepository.save(data);
  }
  async delete(id: string): Promise<boolean> {
    await this.ormRepository.delete(id);

    return true;
  }
}
