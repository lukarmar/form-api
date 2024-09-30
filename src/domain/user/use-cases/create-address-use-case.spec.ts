import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AddressRepositoryMock, UserRepositoryMock } from '@test/mock/repositories';
import { dataAddressInput, dataUser } from '@test/fixtures';
import { CreateAddressUseCase } from './create-address.use-case';

describe('CreateAddressUserCase', () => {
  let sut: CreateAddressUseCase;

  const dataCreateAddress = {
    ...dataAddressInput,
    id: 1,
    isActivated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: dataUser,
  };

  beforeEach(() => {
    sut = new CreateAddressUseCase(AddressRepositoryMock, UserRepositoryMock);
  });

  it('should create a new address', async () => {
    vi.spyOn(UserRepositoryMock, 'findById').mockResolvedValue(dataUser);
    vi.spyOn(AddressRepositoryMock, 'create').mockResolvedValue(dataCreateAddress);
    const response = await sut.execute(dataAddressInput);

    expect(response).toEqual(dataCreateAddress);
    expect(AddressRepositoryMock.create).toBeCalledWith({ ...dataAddressInput, isActivated: true });
    expect(UserRepositoryMock.findById).toBeCalledWith(dataAddressInput.userId);
  });

  it('should throw an error when user not exists', async () => {
    vi.spyOn(UserRepositoryMock, 'findById').mockResolvedValue(null);
    const response = sut.execute(dataAddressInput);
    await expect(response).rejects.toThrow('User not found');
  });
});
