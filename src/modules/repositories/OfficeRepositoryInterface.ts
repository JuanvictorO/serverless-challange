import { BaseRepositoryInterface } from '@shared/repositories/BaseRepositoryInterface';

import { Office } from '../infra/typeorm/entities/Office';

export type OfficeRepositoryInterface = BaseRepositoryInterface<Office>;
