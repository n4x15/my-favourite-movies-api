import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  genreId: number;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.genres, { orphanedRowAction: 'delete' })
  user: User;
}
