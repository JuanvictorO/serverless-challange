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
    const name = 'Developer I';

    await createOfficeUseCase.execute(name);

    console.log(officeRepositoryInMemory.findAll());

    const officeCreated = await officeRepositoryInMemory.findByName(name);

    console.log('Officec Criado: ', officeCreated);
    expect(officeCreated).toHaveProperty('id');
  });
});
