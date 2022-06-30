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

  async findAll(): Promise<Employee[]> {
    const employees = await this.ormRepository.find();

    return employees;
  }

  async findOne(id: string, options?: FindOneOptions | undefined): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id, options);

    return employee;
  }

  async create(data: ICreateEmployeeDTO): Promise<Employee> {
    const employee = await this.ormRepository.save(data);

    return employee;
  }

  async save(data: IUpdateEmployeeDTO): Promise<Employee> {
    const employee = await this.ormRepository.save(data);

    return employee;
  }
  
  async delete(id: string): Promise<boolean> {
    await this.ormRepository.delete(id);

    return true;
  }
}
