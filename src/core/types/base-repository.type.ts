export interface BaseRepositoryType<T> {
  create: (entity: T) => Promise<T>;
  findById: (id: number) => Promise<T | null>;
}
