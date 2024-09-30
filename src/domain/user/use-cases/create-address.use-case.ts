import { TYPES } from '@core/constants';
import { inject, injectable } from 'inversify';
import { UserRepositoryInterface, AddressRepositoryInterface } from '../repositories';
import { BaseUseCase } from '@core/types';
import { AddressEntity } from '@infra/database/entities';
import { CreateAddressInputType } from '@core/validation/create-address-input.validation';
import AppError from '@core/error/AppError';

@injectable()
export class CreateAddressUseCase implements BaseUseCase<CreateAddressInputType, AddressEntity> {
  constructor(
    @inject(TYPES.AddressRepository) private readonly addressRepository: AddressRepositoryInterface,
    @inject(TYPES.UserRepository) private readonly userRepository: UserRepositoryInterface,
  ) {}
  async execute(params: CreateAddressInputType): Promise<AddressEntity> {
    try {
      const hasUser = await this.userRepository.findById(params.userId);
      if (!hasUser) {
        throw new AppError('User not found');
      }
      return this.addressRepository.create({ ...params, isActivated: true });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new Error(`Error creating address: ${error}`);
    }
  }
}
