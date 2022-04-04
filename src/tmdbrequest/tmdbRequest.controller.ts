import { Controller, Get, Param } from '@nestjs/common';
import { GetMoviesArgs } from 'src/utils/types/movieListInterface';
import { TmdbRequestService } from './tmdbRequest.service';

@Controller()
export class TmdbRequestController {
  constructor(private readonly tmdbRequestService: TmdbRequestService) {}

  @Get()
  getGenres() {
    return this.tmdbRequestService.getGenres();
  }

  @Get()
  getMovies(filters: GetMoviesArgs) {
    return this.tmdbRequestService.getMovies(filters);
  }

  @Get()
  getMovie(id: number) {
    return this.tmdbRequestService.getMovie(id);
  }
}
