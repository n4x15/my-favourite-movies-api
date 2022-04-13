import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieDto {
  @Field()
  id: number;

  @Field()
  overview: string;

  @Field()
  poster_path: string;

  @Field()
  release_date: string;

  @Field()
  title: string;

  @Field()
  vote_average: number;

  @Field({defaultValue: false})
  isWatched: boolean;
}
