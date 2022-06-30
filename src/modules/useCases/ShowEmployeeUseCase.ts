import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';

type Request = {
  id: string;
};

@injectable()
export class ShowEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,
  ) {}

  public async execute({ id }: Request): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);

    if (!employee) {
      throw new AppError('Employee not found');
    }

    return employee;
  }
}
