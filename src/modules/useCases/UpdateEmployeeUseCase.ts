import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';

type Request = {
  id: string;
  name: string;
  birthday: Date;
  office_id: string;
};

@injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,
  ) {}

  public async execute({ id, name, birthday, office_id }: Request): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);

    if (!employee) {
      throw new AppError('Employee not found');
    }

    employee.name = name;
    employee.birthday = birthday;
    employee.office_id = office_id;

    await this.employeeRepository.save(employee);

    return employee;
  }
}
