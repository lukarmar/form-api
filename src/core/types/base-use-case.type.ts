export interface BaseUseCase<T extends object = object, R = void> {
  execute(params?: T): Promise<R>;
}
