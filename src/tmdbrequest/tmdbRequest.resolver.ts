import { Resolver, Query, Args } from '@nestjs/graphql';
import { TmdbRequestService } from './tmdbRequest.service';
import { GenresDto } from './dto/genres.dto';
import { MovieDto } from './dto/movie.dto';
import { MoviesInputDto } from './dto/moviesInput.dto';

@Resolver()
export class TmdbRequestResolver {
  constructor(private tmdbRequestService: TmdbRequestService) {}

  @Query(() => [GenresDto])
  getGenres(@Args('language') language: string) {
    return this.tmdbRequestService.getGenres(language);
  }

  @Query(() => [MovieDto])
  getMovies(@Args('filters') filters: MoviesInputDto) {
    return this.tmdbRequestService.getMovies(filters);
  }
}
