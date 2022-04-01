import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, map, of } from 'rxjs';
import { GetMoviesArgs } from 'src/utils/types/movieListInterface';
import { genresUrl, movieUrl } from 'src/utils/urls';
import { effectiveUrl } from 'src/utils/utils';

@Injectable()
export class TmdbRequestService {
  constructor(private httpService: HttpService) {}

  getGenres() {
    return this.httpService
      .get(genresUrl + '?api_key=' + process.env.TMDB_API)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError(err => of([]))
      );
  }

  getMovies(filters: GetMoviesArgs) {
    return this.httpService.get(effectiveUrl(filters)).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(err => of([]))
    );
  }

  getMovie(id: number) {
    return this.httpService
      .get(movieUrl + '?id=' + id + '?api_key=' + process.env.TMDB_API)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError(err => of([]))
      );
  }
}
