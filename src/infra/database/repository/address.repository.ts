import { AddressRepositoryInterface } from '@domain/user/repositories';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities';
import { injectable, inject } from 'inversify';
import { TYPES } from '@core/constants';

@injectable()
export class AddressRepository implements AddressRepositoryInterface {
  constructor(@inject(TYPES.AddressEntityRepository) private readonly repository: Repository<AddressEntity>) {}

  findById(id: number): Promise<AddressEntity | null> {
    return this.repository.findOne({ where: { id } });
  }
  create(entity: AddressEntity): Promise<AddressEntity> {
    return this.repository.save(entity);
  }
  findOne(id: number): Promise<AddressEntity | null> {
    return this.repository.findOne({ where: { id } });
  }
}
