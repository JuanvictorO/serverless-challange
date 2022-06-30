import { EmployeeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/EmployeeRepositoryInMemory';
import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateEmployeeUseCase } from '../CreateEmployeeUseCase';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';
import { DeleteEmployeeUseCase } from '../DeleteEmployeeUseCase';
import { UpdateEmployeeUseCase } from '../UpdateEmployeeUseCase';

let deleteEmployeeUseCase: DeleteEmployeeUseCase;
let createEmployeeUseCase: CreateEmployeeUseCase;
let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let officeRepositoryInMemory: OfficeRepositoryInMemory;
let createOfficeUseCase: CreateOfficeUseCase;

describe('Delete employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepositoryInMemory, officeRepositoryInMemory);
    deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepositoryInMemory);
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to delete employee', async () => {
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

    await deleteEmployeeUseCase.execute(employedCreated.id);

    const checkEmployeeDeleted = await employeeRepositoryInMemory.findOne(employedCreated.id);

    expect(checkEmployeeDeleted).toBe(undefined);
  });

  it('should not be able to delete employee with invalid id', async () => {
    const id = 'abcdefg';

    await expect(deleteEmployeeUseCase.execute(id)).rejects.toEqual(new AppError('Employee not found'));
  });
});
