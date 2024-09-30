import { BaseEntity } from '@core/entities';
import { Entity, Column, OneToMany } from 'typeorm';
import { AddressEntity } from '@infra/database/entities/address.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'int', name: 'profile' })
  profile: number;

  @Column({ type: 'varchar', name: 'tax_identifier' })
  taxIdentifier: string;

  @Column({ type: 'varchar', name: 'responsible_documents', nullable: true })
  responsibleDocument?: string;

  @Column({ type: 'varchar', name: 'cell_phone' })
  cellPhone: string;

  @Column({ type: 'varchar', name: 'phone', nullable: true })
  phone?: string;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];
}
