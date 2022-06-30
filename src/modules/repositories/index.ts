import { container } from 'tsyringe';
import { EmployeeRepository } from '@modules/infra/typeorm/repositories/EmployeeRepository';
import { OfficeRepository } from '@modules/infra/typeorm/repositories/OfficeRepository';
import { EmployeeRepositoryInterface } from './EmployeeRepositoryInterface';
import { OfficeRepositoryInterface } from './OfficeRepositoryInterface';

container.registerSingleton<EmployeeRepositoryInterface>('EmployeeRepository', EmployeeRepository);
container.registerSingleton<OfficeRepositoryInterface>('OfficeRepository', OfficeRepository);
