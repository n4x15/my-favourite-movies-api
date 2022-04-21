import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieDto {
  @Field()
  id: number;

  @Field()
  overview: string;

  @Field({ name: 'poster_path' })
  posterPath: string;

  @Field({ name: 'release_date' })
  releaseDate: string;

  @Field()
  title: string;

  @Field({ name: 'vote_average' })
  voteAverage: number;

  @Field({ defaultValue: false })
  isWatched: boolean;
}
