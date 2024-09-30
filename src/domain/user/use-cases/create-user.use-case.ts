import { TYPES } from '@core/constants';
import { inject, injectable } from 'inversify';
import { UserRepositoryInterface } from '../repositories';
import { BaseUseCase } from '@core/types';
import { UserEntity } from '@infra/database/entities';
import { CreateUserInputType } from '@core/validation/create-user-input.validation';
import AppError from '@core/error/AppError';

@injectable()
export class CreateUserUseCase implements BaseUseCase<CreateUserInputType, UserEntity> {
  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepositoryInterface) {}
  async execute(params: CreateUserInputType): Promise<UserEntity> {
    try {
      const hasUserByTaxIdentifier = await this.userRepository.findByTaxIdentifier(params.taxIdentifier);
      if (hasUserByTaxIdentifier) {
        throw new AppError('User already exists');
      }
      const hasUserByEmail = await this.userRepository.findByEmail(params.email);
      if (hasUserByEmail) {
        throw new AppError('User already exists');
      }
      return this.userRepository.create(params);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new Error(`Error creating user: ${error}`);
    }
  }
}
