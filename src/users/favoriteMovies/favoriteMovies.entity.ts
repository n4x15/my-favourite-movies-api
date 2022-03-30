import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class FavoriteMovies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  favoriteIds: number;

  @Column({ default: false })
  isWatched: boolean;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => User, (user) => user.favoriteMovies)
  user: User;
}
