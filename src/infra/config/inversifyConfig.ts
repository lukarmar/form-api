/* eslint-disable @typescript-eslint/no-require-imports */
import 'reflect-metadata';

import { AsyncContainerModule, interfaces } from 'inversify';
import { AppDataSource, getDbConnection } from './db-config';
import { EnvService } from '@infra/env';
import { TYPES } from '@core/constants';
import { Repository } from 'typeorm';
import { UserEntity, AddressEntity } from '@infra/database/entities';
import { CreateUserUseCase } from '@domain/user/use-cases/create-user.use-case';
import { UserRepository } from '@infra/database/repository/user.repository';
import { UserRepositoryInterface, AddressRepositoryInterface } from '@domain/user/repositories';
import { AddressRepository } from '@infra/database/repository/address.repository';
import { CreateAddressUseCase } from '@domain/user/use-cases/create-address.use-case';

export const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  await getDbConnection();

  await require('@infra/http/controllers');

  bind<Repository<UserEntity>>(TYPES.UserEntityRepository)
    .toDynamicValue(() => AppDataSource.getRepository(UserEntity))
    .inRequestScope();

  bind<Repository<AddressEntity>>(TYPES.AddressEntityRepository)
    .toDynamicValue(() => AppDataSource.getRepository(AddressEntity))
    .inRequestScope();

  bind<UserRepositoryInterface>(TYPES.UserRepository).to(UserRepository);
  bind<AddressRepositoryInterface>(TYPES.AddressRepository).to(AddressRepository);

  bind<EnvService>(TYPES.EnvService).to(EnvService);
  bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
  bind<CreateAddressUseCase>(TYPES.CreateAddressUseCase).to(CreateAddressUseCase);
});
