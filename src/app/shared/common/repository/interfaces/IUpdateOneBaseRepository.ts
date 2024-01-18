import { ModelConstructor } from './IModelConstructor'

export default interface IUpdateOneBaseRepository<T, U> {
  execute(item: Partial<T>, condition, modelClass: ModelConstructor<T, U>): Promise<U>;
}