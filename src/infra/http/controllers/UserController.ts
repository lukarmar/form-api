import { TYPES } from '@core/constants';
import { CreateUserUseCase } from '@domain/user/use-cases/create-user.use-case';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from 'inversify-express-utils';
import { UserEntity, type AddressEntity } from '@infra/database/entities';
import { validateRequestData } from '@core/validation/validation-middleware';
import { CreateUserInputSchema, CreateUserInputType } from '@core/validation/create-user-input.validation';
import { CreateAddressInputType, CreateAddressInputSchema } from '@core/validation/create-address-input.validation';
import { CreateAddressUseCase } from '@domain/user/use-cases/create-address.use-case';

@controller('/user')
export class UserController implements interfaces.Controller {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly createAddressUseCase: CreateAddressUseCase;

  constructor(
    @inject(TYPES.CreateUserUseCase) createUserUseCase: CreateUserUseCase,
    @inject(TYPES.CreateAddressUseCase) createAddressUseCase: CreateAddressUseCase,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.createAddressUseCase = createAddressUseCase;
  }

  @httpPost('/', validateRequestData(CreateUserInputSchema, ['body']))
  private createUser(@requestBody() newUser: CreateUserInputType): Promise<UserEntity> {
    return this.createUserUseCase.execute(newUser);
  }

  @httpPost('/address', validateRequestData(CreateAddressInputSchema, ['body']))
  private createAddress(@requestBody() newAddress: CreateAddressInputType): Promise<AddressEntity> {
    return this.createAddressUseCase.execute(newAddress);
  }
}
