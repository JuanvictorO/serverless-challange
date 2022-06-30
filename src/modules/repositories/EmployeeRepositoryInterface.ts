import { BaseRepositoryInterface } from '@shared/repositories/BaseRepositoryInterface';

import { Employee } from '../infra/typeorm/entities/Employee';

export type EmployeeRepositoryInterface = BaseRepositoryInterface<Employee>;
