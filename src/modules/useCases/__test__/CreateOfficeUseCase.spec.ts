import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';

let createOfficeUseCase: CreateOfficeUseCase;
let officeRepositoryInMemory: OfficeRepositoryInMemory;

describe('Create office', () => {
  beforeEach(() => {
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to create a new office', async () => {
    const name = 'Developer I';

    await createOfficeUseCase.execute(name);

    const officeCreated = await officeRepositoryInMemory.findByName(name);

    expect(officeCreated).toHaveProperty('id');
  });

  it('should not be able to create a new office with name exists', async () => {
    const name = 'Developer I';

    await createOfficeUseCase.execute(name);

    await expect(createOfficeUseCase.execute(name)).rejects.toEqual(new AppError('Office already exists'));
  });
});
