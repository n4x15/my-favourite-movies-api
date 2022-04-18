import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { FavoriteMovie } from './favoriteMovies/favoriteMovies.entity';
import { Genre } from './genres/genres.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  login: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field(() => [Genre])
  @OneToMany(() => Genre, (genres) => genres.user, { cascade: true })
  genres: Genre[];

  @Field(() => [FavoriteMovie])
  @OneToMany(() => FavoriteMovie, (favoriteMovies) => favoriteMovies.user, {
    cascade: true,
  })
  favoriteMovies: FavoriteMovie[];
}
