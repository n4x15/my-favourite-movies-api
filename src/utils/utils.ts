import { GetMoviesArgs } from './types/movieListInterface';
import { moviesUrl } from './urls';

const mapArgsToApi = (filters: GetMoviesArgs): string =>
  Object.entries({
    api_key: process.env.TMDB_API,
    ...filters,
    ...(filters.genresId ? { with_genres: `${filters.genresId}` } : {}),
    ...(filters.rating ? { 'vote_average.gte': `${filters.rating}` } : {}),
    
  })
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

export const moviesListUrl = (filters: GetMoviesArgs) => {
  return `${moviesUrl}?${mapArgsToApi(filters)}`;
};
