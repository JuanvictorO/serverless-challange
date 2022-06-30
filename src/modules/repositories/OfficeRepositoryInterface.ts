import { Office } from '../infra/typeorm/entities/Office';

export interface OfficeRepositoryInterface {
  findAll(): Promise<Office[]>;
  findOne(id: string): Promise<Office | undefined>;
  findByName(name: string): Promise<Office | undefined>;
  create(name: string): Promise<Office>;
}
