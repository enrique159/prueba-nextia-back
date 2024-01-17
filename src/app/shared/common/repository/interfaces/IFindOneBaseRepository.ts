import { ModelConstructor } from './IModelConstructor'

export default interface IFindOneBaseRepository<T, U> {
  execute(item: T, modelClass: ModelConstructor<T, U>): Promise<U>;
}