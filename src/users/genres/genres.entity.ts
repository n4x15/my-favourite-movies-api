import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genresIds: number;

  @Column()
  isChecked: boolean;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => User, (user) => user.genres)
  user: User;
}
