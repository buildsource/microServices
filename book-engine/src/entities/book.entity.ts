import { BookAssessmentsEntity } from './bookAssessments.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abstract: string;

  @Column()
  author: string;

  @Column()
  year: Date;

  @JoinColumn()
  @OneToMany(
    () => BookAssessmentsEntity,
    (x: BookAssessmentsEntity) => x.book,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  bookAssessments: Array<BookAssessmentsEntity>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
