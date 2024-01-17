import { ModelConstructor } from './IModelConstructor'

export default interface ICreateOneBaseRepository<T> {
  execute(item: Partial<T>, modelClass: ModelConstructor<T>): Promise<T>;
}