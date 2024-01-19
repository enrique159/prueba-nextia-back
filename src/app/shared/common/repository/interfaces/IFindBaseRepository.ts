import { ModelConstructor } from './IModelConstructor'

export default interface IFindBaseRepository<T, U> {
  execute(item: T, modelClass: ModelConstructor<T, U>): Promise<U>;
}