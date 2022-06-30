import { inject, injectable } from 'tsyringe';

import { Office } from '../infra/typeorm/entities/Office';
import { OfficeRepositoryInterface } from '../repositories/OfficeRepositoryInterface';

type Request = {
  name: string;
};

@injectable()
export class CreateOfficeUseCase {
  constructor(
    @inject('OfficeRepository')
    private officeRepository: OfficeRepositoryInterface,
  ) {}

  public async execute({ name }: Request): Promise<Office> {
    const config = await this.officeRepository.create({
      name,
    });

    return config;
  }
}
