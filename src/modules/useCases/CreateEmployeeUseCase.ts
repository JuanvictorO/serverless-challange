import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';
import { AppError } from '@shared/errors/AppError';
import { getDate } from '@shared/utils/getDate';
import { inject, injectable } from 'tsyringe';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,

    @inject('OfficeRepository')
    private officeRepository: OfficeRepositoryInterface,
  ) {}

  public async execute({ name, birthday, office_id }: ICreateEmployeeDTO): Promise<Employee> {
    const office = await this.officeRepository.findOne(office_id);

    if (!office) {
      throw new AppError('Office not found');
    }

    const employee = await this.employeeRepository.create({
      name,
      birthday,
      office_id,
    });

    const age = getDate(employee.birthday);
    employee.age = age;

    return employee;
  }
}
