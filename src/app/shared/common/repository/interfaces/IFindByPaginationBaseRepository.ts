import { ModelConstructor } from './IModelConstructor'

export default interface IFindByPaginationBaseRepository<U> {
  execute(meta, modelClass: ModelConstructor<U>): Promise<U>;
}