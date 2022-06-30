import { EmployeeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/EmployeeRepositoryInMemory';
import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateEmployeeUseCase } from '../CreateEmployeeUseCase';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';
import { ShowEmployeeUseCase } from '../ShowEmployeeUseCase';

let showEmployeeUseCase: ShowEmployeeUseCase;
let createEmployeeUseCase: CreateEmployeeUseCase;
let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let officeRepositoryInMemory: OfficeRepositoryInMemory;
let createOfficeUseCase: CreateOfficeUseCase;

describe('Show employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepositoryInMemory, officeRepositoryInMemory);
    showEmployeeUseCase = new ShowEmployeeUseCase(employeeRepositoryInMemory);
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to show employee', async () => {
    const office = await createOfficeUseCase.execute('CEO');

    const employee = {
      name: 'Alex Jorge',
      birthday: new Date('2000-06-06'),
      office_id: office.id,
    };

    const employedCreated = await createEmployeeUseCase.execute({
      name: employee.name,
      birthday: employee.birthday,
      office_id: employee.office_id!,
    });

    const employeeResult = await showEmployeeUseCase.execute(employedCreated.id);

    const checkEmployeeId = await employeeRepositoryInMemory.findOne(employeeResult.id);

    expect(checkEmployeeId).toHaveProperty('id');
  });

  it('should not be able to show employee with invalid id', async () => {
    const id = 'abcdefg';

    await expect(showEmployeeUseCase.execute(id)).rejects.toEqual(new AppError('Employee not found'));
  });
});
