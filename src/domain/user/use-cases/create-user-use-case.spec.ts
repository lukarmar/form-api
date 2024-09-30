import { describe, it, beforeEach, expect, vi } from 'vitest';
import { CreateUserUseCase } from './create-user.use-case';
import { UserRepositoryMock } from '@test/mock/repositories';
import { dataInput, dataUser } from '@test/fixtures';

describe('CreateUserUserCase', () => {
  let sut: CreateUserUseCase;

  beforeEach(() => {
    sut = new CreateUserUseCase(UserRepositoryMock);
  });

  it('should create a new PF user', async () => {
    vi.spyOn(UserRepositoryMock, 'create').mockResolvedValue(dataUser);
    const response = await sut.execute(dataInput);

    expect(response).toEqual(dataUser);
    expect(UserRepositoryMock.create).toBeCalledWith(dataInput);
    expect(response.profile).toBe(1);
  });

  it('should create a new PJ user', async () => {
    const dataInputPJ = {
      ...dataInput,
      taxIdentifier: '12345678901234',
      profile: 2,
      responsibleDocument: '12345678900',
    };
    const dataResponsePJ = { ...dataUser, profile: 2 };
    vi.spyOn(UserRepositoryMock, 'create').mockResolvedValue(dataResponsePJ);
    const response = await sut.execute(dataInputPJ);

    expect(response).toEqual(dataResponsePJ);
    expect(UserRepositoryMock.create).toBeCalledWith(dataInputPJ);
    expect(response.profile).toBe(2);
  });

  it('should throw an error when user already exists by email', async () => {
    vi.spyOn(UserRepositoryMock, 'findByEmail').mockResolvedValue(dataUser);
    const response = sut.execute(dataInput);
    await expect(response).rejects.toThrow('User already exists');
  });

  it('should throw an error when user already exists by taxIdentifier', async () => {
    vi.spyOn(UserRepositoryMock, 'findByTaxIdentifier').mockResolvedValue(dataUser);
    const response = sut.execute(dataInput);
    await expect(response).rejects.toThrow('User already exists');
  });
});
