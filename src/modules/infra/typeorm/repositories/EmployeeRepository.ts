import { EmployeeRepositoryInterface } from '@modules/repositories/EmployeeRepositoryInterface';

import { BaseRepository } from '@shared/repositories/BaseRepository';

import { Employee } from '../entities/Employee';

export class EmployeeRepository extends BaseRepository<Employee> implements EmployeeRepositoryInterface {
  constructor() {
    super(Employee);
  }
}
