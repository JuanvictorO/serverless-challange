import { EmployeeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/EmployeeRepositoryInMemory';
import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateEmployeeUseCase } from '../CreateEmployeeUseCase';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';

let createEmployeeUseCase: CreateEmployeeUseCase;
let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let officeRepositoryInMemory: OfficeRepositoryInMemory;
let createOfficeUseCase: CreateOfficeUseCase;

describe('Create employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepositoryInMemory, officeRepositoryInMemory);
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to create a new employee', async () => {
    const office = await createOfficeUseCase.execute('CEO');

    const employee = {
      name: 'Alex Jorge',
      birthday: new Date('2000-06-06'),
      office_id: office.id,
    };

    await createEmployeeUseCase.execute({
      name: employee.name,
      birthday: employee.birthday,
      office_id: employee.office_id!,
    });

    const employeeCreated = await employeeRepositoryInMemory.findByName(employee.name);

    expect(employeeCreated).toHaveProperty('id');
  });

  it('should not be able to create a new employee with invalid office_id', async () => {
    const employee = {
      name: 'Alex Jorge',
      birthday: new Date('2000-06-06'),
      office_id: 'abcdefghi',
    };

    await expect(
      createEmployeeUseCase.execute({
        name: employee.name,
        birthday: employee.birthday,
        office_id: employee.office_id,
      })
    ).rejects.toEqual(new AppError('Office not found'));
  });
});
