import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';

import { getRepository, Repository } from 'typeorm';

import { Office } from '../entities/Office';

export class OfficeRepository implements OfficeRepositoryInterface {
  private ormRepository: Repository<Office>;

  constructor() {
    this.ormRepository = getRepository(Office);
  }

  findAll(): Promise<Office[]> {
    return this.ormRepository.find();
  }

  findOne(id: string): Promise<Office | undefined> {
    return this.ormRepository.findOne({ id });
  }
  create(name: string): Promise<Office> {
    return this.ormRepository.save({ name });
  }
}
