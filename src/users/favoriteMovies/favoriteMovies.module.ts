import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmdbRequestService } from 'src/tmdbrequest/tmdbRequest.service';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { FavoriteMovie } from './favoriteMovies.entity';
import { FavoriteMoviesResolver } from './favoriteMovies.resolver';
import { FavoriteMoviesService } from './favoriteMovies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteMovie, User]),
    HttpModule,
    UserModule,
  ],
  providers: [
    FavoriteMoviesResolver,
    FavoriteMoviesService,
    TmdbRequestService,
  ],
})
export class FavoriteMoviesModule {}
