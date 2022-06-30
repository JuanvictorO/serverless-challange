import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';
import { getDate } from '@shared/utils/getDate';
@injectable()
export class ShowEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id, {
      relations: ['office'],
    });

    if (!employee) {
      throw new AppError('Employee not found');
    }

    const age = getDate(employee.birthday);
    employee.age = age;

    return employee;
  }
}
