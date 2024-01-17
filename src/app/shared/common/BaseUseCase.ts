export interface BaseUseCase<T, U> {
  execute(params?: T): U
}
