export interface BaseConstructor<T> {
  new (): T;
}

export interface CreateConstructor<T> extends BaseConstructor<T> {
  create(item: Partial<T>): Promise<T>;
}

export interface FinderConstructor<T, U> extends BaseConstructor<T> {
  findOne(value: { where: T }): Promise<U>;
  findAll(value: { where: T }): Promise<U>;
  findByPk(value: T): Promise<U>;
  destroy(value: { where: T }): Promise<U>;
}

export interface UpdateOneConstructor<T,U> extends BaseConstructor<T> {
  update(value: T, condition): Promise<U>;
}

export interface GetByPaginationRepository<U> {
  findAndCountAll(value): Promise<U>;
}

export type ModelConstructor<T, U = T> = CreateConstructor<T> & FinderConstructor<T, U> & UpdateOneConstructor<T, U> & GetByPaginationRepository<U>;