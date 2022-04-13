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
export class Genres {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  genresId: number;

  @Field()
  @Column({ default: false })
  isChecked: boolean;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.genres)
  user: User;
}
