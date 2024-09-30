import { ProfileTypeEnum } from '@core/enum';
import { AddressProps } from './address.type';

export interface UserProps {
  taxIdentification: string;
  identificationResponsible?: string;
  profile: ProfileTypeEnum;
  name: string;
  email: string;
  cellphone: string;
  phone?: string;
  acceptedTerms: boolean;
  addressId: number;
  address: AddressProps;
}
