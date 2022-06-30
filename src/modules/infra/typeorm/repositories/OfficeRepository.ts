import { OfficeRepositoryInterface } from '@modules/repositories/OfficeRepositoryInterface';

import { BaseRepository } from '@shared/repositories/BaseRepository';

import { Office } from '../entities/Office';

export class OfficeRepository extends BaseRepository<Office> implements OfficeRepositoryInterface {
  constructor() {
    super(Office);
  }
}
