import { IIndexEmployeeDTO } from '@modules/dtos/IIndexEmployeeDTO';
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

  public async execute({ name, office }: IIndexEmployeeDTO): Promise<Employee[] | Employee> {
    const employee = await this.employeeRepository.findAll(name, office);

    if (employee instanceof Array) {
      employee.forEach(obj => {
        const age = getDate(obj.birthday);
        obj.age = age;
      });
    } else {
      employee.age = getDate(employee.birthday);
    }

    return employee;
  }
}
