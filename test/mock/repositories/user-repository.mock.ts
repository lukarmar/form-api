import { Mocked, vi } from 'vitest'
import { UserRepositoryInterface } from "@domain/user/repositories";

export const UserRepositoryMock: Mocked<UserRepositoryInterface> = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  findByTaxIdentifier: vi.fn(),
  findById: vi.fn(),
}