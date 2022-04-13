import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmdbRequestService } from 'src/tmdbrequest/tmdbRequest.service';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { FavoriteMovies } from './favoriteMovies.entity';
import { FavoriteMoviesResolver } from './favoriteMovies.resolver';
import { FavoriteMoviesService } from './favoriteMovies.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovies, User]), HttpModule],
  providers: [
    FavoriteMoviesResolver,
    FavoriteMoviesService,
    UserService,
    TmdbRequestService,
  ],
})
export class FavoriteMoviesModule {}
