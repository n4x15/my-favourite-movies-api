import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieDto {
  @Field()
  id: number;

  @Field()
  overview: string;

  @Field({ name: 'posterPath' })
  poster_path: string;

  @Field({ name: 'releaseDate' })
  release_date: string;

  @Field()
  title: string;

  @Field({ name: 'voteAverage' })
  vote_average: number;

  @Field({ defaultValue: false })
  isWatched: boolean;

  @Field({ defaultValue: false })
  isSaved: boolean;
}
