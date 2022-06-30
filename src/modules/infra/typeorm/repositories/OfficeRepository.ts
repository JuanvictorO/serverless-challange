import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';

import { getRepository, Repository } from 'typeorm';

import { Office } from '../entities/Office';

export class OfficeRepository implements OfficeRepositoryInterface {
  private ormRepository: Repository<Office>;

  constructor() {
    this.ormRepository = getRepository(Office);
  }

  async findAll(): Promise<Office[]> {
    const offices = await this.ormRepository.find();

    return offices;
  }

  async findByName(name: string): Promise<Office | undefined> {
    const office = await this.ormRepository.findOne({ name });

    return office;
  }

  async findOne(id: string): Promise<Office | undefined> {
    const office = await this.ormRepository.findOne({ id });

    return office;
  }

  async create(name: string): Promise<Office> {
    const office = await this.ormRepository.save({ name });

    return office;
  }
}
