import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from '@core/entities';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'street' })
  street: string;

  @Column({ type: 'varchar', name: 'number' })
  number: string;

  @Column({ type: 'varchar', name: 'complement', nullable: true })
  complement?: string;

  @Column({ type: 'varchar', name: 'neighborhood' })
  neighborhood: string;

  @Column({ type: 'varchar', name: 'city' })
  city: string;

  @Column({ type: 'varchar', name: 'state' })
  state: string;

  @Column({ type: 'varchar', name: 'country' })
  country: string;

  @Column({ type: 'varchar', name: 'zip_code' })
  zipCode: string;

  @Column({ type: 'boolean', name: 'is_activated' })
  isActivated: boolean;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;
}
