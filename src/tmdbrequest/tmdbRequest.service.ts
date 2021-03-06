import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { GetMoviesArgs } from 'src/utils/types/movieListInterface';
import { genresUrl, movieUrl } from 'src/utils/urls';
import { moviesListUrl } from 'src/utils/utils';
import { AxiosResponse } from 'axios';
import { GenresDto } from './dto/genres.dto';
import { MovieDto } from './dto/movie.dto';
import { ResponseMovieDto } from './dto/response.movie.dto';

@Injectable()
export class TmdbRequestService {
  logger: Logger;

  constructor(private httpService: HttpService) {
    this.logger = new Logger(TmdbRequestService.name);
  }

  getGenres(language: string): Observable<GenresDto[]> {
    return this.httpService
      .get(
        genresUrl +
          '?api_key=' +
          process.env.TMDB_API +
          '&language=' +
          language,
      )
      .pipe(
        map((response) => {
          return response.data.genres;
        }),
        catchError((err) => {
          this.logger.error(err);
          throw new HttpException(
            'INTERNAL SERVER ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  getMovies(filters: GetMoviesArgs): Observable<ResponseMovieDto> {
    return this.httpService.get(moviesListUrl(filters)).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        this.logger.error(err);
        throw new HttpException(
          'INTERNAL SERVER ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  getMovie(id: number, language: string): Observable<MovieDto> {
    return this.httpService
      .get(
        movieUrl +
          id +
          '?api_key=' +
          process.env.TMDB_API +
          '&language=' +
          language,
      )
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((err) => {
          this.logger.error(err);
          throw new HttpException(
            'INTERNAL SERVER ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
