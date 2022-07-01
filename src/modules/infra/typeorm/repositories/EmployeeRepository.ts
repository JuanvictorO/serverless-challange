import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { IUpdateEmployeeDTO } from '@modules/dtos/IUpdateEmployeeDTO';
import { EmployeeRepositoryInterface } from '@modules/repositories/EmployeeRepositoryInterface';

import { FindOneOptions, getRepository, Like, Repository } from 'typeorm';

import { Employee } from '../entities/Employee';

export class EmployeeRepository implements EmployeeRepositoryInterface {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  async findAll(name?: string, office?: string): Promise<Employee[] | Employee> {
    let where;

    if (name && office) {
      where = {
        name: Like(`%${name}%`),
        office: {
          name: Like(`%${office}%`),
        },
      };
    } else if (name) {
      where = {
        name: Like(`%${name}%`),
      };
    } else if (office) {
      where = {
        office: {
          name: Like(`%${office}%`),
        },
      };
    }

    if (where) {
      return await this.ormRepository.find({
        relations: ['office'],
        where: where,
      });
    } else {
      return await this.ormRepository.find({
        relations: ['office'],
      });
    }
  }

  async findOne(id: string, options?: FindOneOptions | undefined): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id, options);

    return employee;
  }

  async findWithFilter(name?: string, office?: string): Promise<Employee[] | Employee | undefined> {
    let where;
    if (name && office) {
      where = {
        name: Like(`%${name}%`),
        office: {
          name: Like(`%${office}%`),
        },
      };
    } else if (name) {
      where = {
        name: Like(`%${name}%`),
      };
    } else {
      where = {
        office: {
          name: Like(`%${office}%`),
        },
      };
    }

    const findEmployees = await this.ormRepository.find({
      relations: ['office'],
      where: where,
    });

    return findEmployees;
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
