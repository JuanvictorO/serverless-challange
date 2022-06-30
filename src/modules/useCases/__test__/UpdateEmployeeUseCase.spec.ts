import { EmployeeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/EmployeeRepositoryInMemory';
import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateEmployeeUseCase } from '../CreateEmployeeUseCase';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';
import { UpdateEmployeeUseCase } from '../UpdateEmployeeUseCase';

let updateEmployeeUseCase: UpdateEmployeeUseCase;
let createEmployeeUseCase: CreateEmployeeUseCase;
let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let officeRepositoryInMemory: OfficeRepositoryInMemory;
let createOfficeUseCase: CreateOfficeUseCase;

describe('Update employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepositoryInMemory, officeRepositoryInMemory);
    updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepositoryInMemory, officeRepositoryInMemory);
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to update employee', async () => {
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

    const employeeToUpdate = {
      id: employedCreated.id,
      name: 'Roberto Carlos',
      birthday: new Date('1990-04-12'),
      office_id: employedCreated.office_id
    }

    await updateEmployeeUseCase.execute({
      id: employeeToUpdate.id,
      name: employeeToUpdate.name,
      birthday: employeeToUpdate.birthday,
      office_id: employeeToUpdate.office_id,
    });

    const employeeUpdated = await employeeRepositoryInMemory.findByName(employeeToUpdate.name);

    expect(employeeUpdated).toHaveProperty('id');
  });

  it('should not be able to update a employee with invalid id', async () => {
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

    const employeeToUpdate = {
      id: "abcdefgh",
      name: 'Roberto Carlos',
      birthday: new Date('1990-04-12'),
      office_id: employedCreated.office_id
    }

    await expect(
      updateEmployeeUseCase.execute({
        id: employeeToUpdate.id,
        name: employeeToUpdate.name,
        birthday: employeeToUpdate.birthday,
        office_id: employeeToUpdate.office_id,
      })
    ).rejects.toEqual(new AppError('Employee not found'));
  });

  it('should not be able to update a employee with invalid office_id', async () => {
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

    const employeeToUpdate = {
      id: employedCreated.id,
      name: 'Roberto Carlos',
      birthday: new Date('1990-04-12'),
      office_id: 'abcdefg'
    }

    await expect(
      updateEmployeeUseCase.execute({
        id: employeeToUpdate.id,
        name: employeeToUpdate.name,
        birthday: employeeToUpdate.birthday,
        office_id: employeeToUpdate.office_id,
      })
    ).rejects.toEqual(new AppError('Office not found'));
  });
});
