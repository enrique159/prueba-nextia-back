export interface ModelConstructor<T> {
  new (): T;
  create(item: Partial<T>): Promise<T>;
}