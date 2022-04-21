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
export class FavoriteMovie {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  favoriteId: number;

  @Field()
  @Column({ default: false })
  isWatched: boolean;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.favoriteMovies, {
    orphanedRowAction: 'delete',
  })
  user: User;
}
