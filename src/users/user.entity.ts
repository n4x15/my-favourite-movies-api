import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { FavoriteMovies } from './favoriteMovies/favoriteMovies.entity';
import {Genres} from './genres/genres.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;
  
  @CreateDateColumn()
  createDate: Date

  @OneToMany(()=> Genres, (genres)=>genres.user)
  genres: Genres[];

  @OneToMany(()=>FavoriteMovies, (favoriteMovies)=>favoriteMovies.user)
  favoriteMovies: FavoriteMovies[];

}