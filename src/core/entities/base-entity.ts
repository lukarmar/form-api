import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
