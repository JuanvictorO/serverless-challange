import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';
import { Office } from '../../entities/Office';

class OfficeRepositoryInMemory implements OfficeRepositoryInterface {
  offices: Office[] = [];

  findOne(id: string): Promise<Office | undefined> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Office[]> {
    const all = this.offices;
    return all;
  }
  async findById(id: string): Promise<Office | undefined> {
    const office = this.offices.find(office => office.id === id);
    return office;
  }

  async findByName(name: string): Promise<Office | undefined> {
    const office = this.offices.find(office => office.name === name);
    return office;
  }

  async create(name: string): Promise<Office> {
    const office = new Office();

    Object.assign(office, {
      name,
    });

    this.offices.push(office);

    console.log('Create Fake: ', office);

    return office;
  }
}

export { OfficeRepositoryInMemory };
