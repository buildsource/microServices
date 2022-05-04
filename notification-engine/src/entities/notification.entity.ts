import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NotificationEntity extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @Column()
  type: 'email' | 'sms';

  @Column()
  response: string;

  @Column()
  status: 'SUCCESS' | 'ERROR';
}
