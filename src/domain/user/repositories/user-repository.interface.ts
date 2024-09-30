import { BaseRepositoryType } from '@core/types';
import { UserEntity } from '@infra/database/entities';

export interface UserRepositoryInterface extends BaseRepositoryType<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  findByTaxIdentifier(taxIdentifier: string): Promise<UserEntity | null>;
}
