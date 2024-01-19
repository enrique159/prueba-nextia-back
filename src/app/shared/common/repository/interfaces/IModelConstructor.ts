export interface BaseConstructor<T> {
  new (): T;
}

export interface CreateConstructor<T> extends BaseConstructor<T> {
  create(item: Partial<T>): Promise<T>;
}

export interface FindOneConstructor<T, U> extends BaseConstructor<T> {
  findOne(value: { where: T }): Promise<U>;
  findAll(value: { where: T }): Promise<U>;
}

export interface UpdateOneConstructor<T,U> extends BaseConstructor<T> {
  update(value: T, condition): Promise<U>;
}

export type ModelConstructor<T, U = T> = CreateConstructor<T> & FindOneConstructor<T, U> & UpdateOneConstructor<T, U>;