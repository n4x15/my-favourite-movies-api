import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { Genres } from './genres.entity';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genres, User])],
  providers: [GenresResolver, GenresService, UserService],
})
export class GenresModule {}
