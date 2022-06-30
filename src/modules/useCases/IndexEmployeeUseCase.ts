import { getDate } from '@shared/utils/getDate';
import { inject, injectable } from 'tsyringe';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';

@injectable()
export class IndexEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,
  ) {}

  public async execute(): Promise<Employee[]> {
    const employee = await this.employeeRepository.findAll({
      relations: ['office']
    });

    employee.forEach(obj => {
      const age = getDate(obj.birthday);
      obj.age = age;
    });

    return employee;
  }
}
