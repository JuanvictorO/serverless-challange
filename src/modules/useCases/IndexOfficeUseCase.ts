import { inject, injectable } from 'tsyringe';

import { Office } from '../infra/typeorm/entities/Office';
import { OfficeRepositoryInterface } from '../repositories/OfficeRepositoryInterface';

@injectable()
export class IndexOfficeUseCase {
  constructor(
    @inject('OfficeRepository')
    private officeRepository: OfficeRepositoryInterface,
  ) {}

  public async execute(): Promise<Office[]> {
    const Office = await this.officeRepository.findAll();

    return Office;
  }
}
