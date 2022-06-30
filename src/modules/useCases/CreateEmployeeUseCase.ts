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
  ) {}

  public async execute({ name, birthday, office_id }: Request): Promise<Employee> {
    const config = await this.employeeRepository.create({
      name,
      birthday,
      office_id,
    });

    return config;
  }
}
