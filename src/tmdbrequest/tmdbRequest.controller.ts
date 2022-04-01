import { Controller, Get, Param } from '@nestjs/common';
import { GetMoviesArgs } from 'src/utils/types/movieListInterface';
import { TmdbRequestService } from './tmdbRequest.service';

@Controller()
export class TmdbRequestController {
  constructor(private readonly tmdbRequestService: TmdbRequestService) {}

  @Get('genres')
  getGenres() {
    return this.tmdbRequestService.getGenres();
  }

  @Get('movies')
  getMovies(filters: GetMoviesArgs) {
    return this.tmdbRequestService.getMovies(filters);
  }

  @Get('movieDetail')
  getMovie(id: number) {
    return this.tmdbRequestService.getMovie(id);
  }
}
