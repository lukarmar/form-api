import { UserRepositoryInterface } from '@domain/user/repositories';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { injectable, inject } from 'inversify';
import { TYPES } from '@core/constants';

@injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(@inject(TYPES.UserEntityRepository) private readonly repository: Repository<UserEntity>) {}
  findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }
  findOne(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { email } });
  }

  findByTaxIdentifier(taxIdentifier: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { taxIdentifier } });
  }
}
