import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Employee } from '../infra/typeorm/entities/Employee';
import { EmployeeRepositoryInterface } from '../repositories/EmployeeRepositoryInterface';

type Request = {
  name: string;
  birthday: Date;
  office_id: string;
};

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepositoryInterface,

    @inject('OfficeRepository')
    private officeRepository: OfficeRepositoryInterface,
  ) {}

  public async execute({ name, birthday, office_id }: Request): Promise<Employee> {
    const office = await this.officeRepository.findOne(office_id);

    if (!office) {
      throw new AppError('Office not found');
    }

    const config = await this.employeeRepository.create({
      name,
      birthday,
      office_id,
    });

    return config;
  }
}
