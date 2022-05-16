import { StarEnum } from 'src/enum/start.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity()
export class BookAssessmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  
  @Column()
  start: string;

  @Column()
  comment: string;

  @JoinColumn()
  @ManyToOne(() => BookEntity, (x: BookEntity) => x.bookAssessments)
  book: BookEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
