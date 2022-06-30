import { inject, injectable } from 'tsyringe';

import { Office } from '../infra/typeorm/entities/Office';
import { OfficeRepositoryInterface } from '../repositories/OfficeRepositoryInterface';

@injectable()
export class CreateOfficeUseCase {
  constructor(
    @inject('OfficeRepository')
    private officeRepository: OfficeRepositoryInterface,
  ) {}

  public async execute(name: string): Promise<Office> {
    const office = await this.officeRepository.create(name);

    return office;
  }
}
