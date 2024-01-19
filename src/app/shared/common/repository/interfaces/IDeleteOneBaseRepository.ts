import { ModelConstructor } from './IModelConstructor'

export default interface IDeleteOneBaseRepository<T, U> {
  execute(item: T, modelClass: ModelConstructor<T, U>): Promise<U>;
}