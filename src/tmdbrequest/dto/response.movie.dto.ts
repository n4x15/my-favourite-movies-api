import { Field, ObjectType } from '@nestjs/graphql';
import { MovieDto } from './movie.dto';

@ObjectType()
export class ResponseMovieDto {
  @Field(()=> [MovieDto])
  results: MovieDto[]

  @Field({name:'totalPages'})
  total_pages: number
}
