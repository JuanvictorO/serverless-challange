import { DeleteResult, FindConditions, FindOneOptions, FindManyOptions, ObjectID,  DeepPartial } from 'typeorm';

export type Field = string | number | Date | ObjectID | undefined;

export interface BaseRepositoryInterface<T> {
  findByIds(ids: string[], options?: FindManyOptions<T> | FindConditions<T>): Promise<T[]>;
  findOne(
    id?: Field | FindOneOptions<T> | FindConditions<T>,
    options?: FindOneOptions<T> | undefined,
  ): Promise<T | undefined>;
  create(data: DeepPartial<T>): Promise<T>;
  save(user: DeepPartial<T>): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
}
