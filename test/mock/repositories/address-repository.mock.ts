import { AddressRepositoryInterface } from "@domain/user/repositories";
import { Mocked, vi } from "vitest";

export const AddressRepositoryMock: Mocked<AddressRepositoryInterface> = {
  create: vi.fn(),
  findById: vi.fn(),
}
