import { OfficeRepositoryInMemory } from '@modules/infra/typeorm/repositories/in-memory/OfficeRepositoryInMemory';
import { CreateOfficeUseCase } from '../CreateOfficeUseCase';

let createOfficeUseCase: CreateOfficeUseCase;
let officeRepositoryInMemory: OfficeRepositoryInMemory;

describe('Create office', () => {
  beforeEach(() => {
    officeRepositoryInMemory = new OfficeRepositoryInMemory();
    createOfficeUseCase = new CreateOfficeUseCase(officeRepositoryInMemory);
  });

  it('should be able to create a new office', async () => {
    const office = {
      name: 'Developer',
    };

    //await createOfficeUseCase.execute(name: office.name);

    const officeCreated = await officeRepositoryInMemory.findByName(office.name);

    expect(officeCreated).toHaveProperty('id');
  });
});
