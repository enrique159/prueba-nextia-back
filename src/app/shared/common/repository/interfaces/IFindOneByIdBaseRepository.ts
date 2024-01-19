import { ModelConstructor } from './IModelConstructor'

export default interface IFindOneByIdBaseRepository<T, U> {
  execute(item: T, modelClass: ModelConstructor<T, U>): Promise<U>;
}