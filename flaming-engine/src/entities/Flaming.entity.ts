import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FlamingEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  coordinates: [number, number];

  @Column()
  val: number;

  @Column()
  year: Date;

  @Column()
  files: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
