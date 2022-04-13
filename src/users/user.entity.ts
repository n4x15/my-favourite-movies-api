import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { FavoriteMovies } from './favoriteMovies/favoriteMovies.entity';
import { Genres } from './genres/genres.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  login: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field(() => [Genres])
  @OneToMany(() => Genres, (genres) => genres.user)
  genres: Genres[];

  @Field(() => [FavoriteMovies])
  @OneToMany(() => FavoriteMovies, (favoriteMovies) => favoriteMovies.user)
  favoriteMovies: FavoriteMovies[];
}
